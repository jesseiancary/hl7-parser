'use strict';

const path = require('path');

function getSeparator(separators) {
  return {
    segment: /[\r\n]{1,2}/, // TODO: This works for current lab integrations, but may need to be updated for future labs.
    field: separators[0],
    component: separators[1],
    repetition: separators[2],
    escape: separators[3],
    subComponent: separators[4]
  };
}

function insertData(parsed, hl7def, separator, index, data) {
  let attribute_name = '';

  /* TODO: This does not account for Repeating Fields. Current lab integrations do not use Repeating Fields, but future labs may. */
  if (hl7def[index.segment] !== undefined && hl7def[index.segment][index.fields] !== undefined) {

    attribute_name += hl7def[index.segment][index.fields].name;

    // If the lab's HL7 Definition file defines this element as a Complex Object (not a Simple Data Type), then drill down into that object.
    if (typeof hl7def[index.segment][index.fields].type === 'object') {

      // If child objects exist.
      if (hl7def[index.segment][index.fields].type[index.component]) {

        attribute_name += '_' + hl7def[index.segment][index.fields].type[index.component].name;

        // If the lab's HL7 Definition file defines this element as a Complex Object (not a Simple Data Type), then drill down into that object.
        if (typeof hl7def[index.segment][index.fields].type[index.component].type === 'object') {

          // If child objects exist.
          if (hl7def[index.segment][index.fields].type[index.component].type[index.subComponent]) {

            attribute_name += '_' + hl7def[index.segment][index.fields].type[index.component].type[index.subComponent].name;

            // If the lab's HL7 Definition file defines this element as NUMERIC, then strip out non-numeric characters - keep the negative symbol and decimal period.
            if (hl7def[index.segment][index.fields].type[index.component].type[index.subComponent].type === 'NM') {
              data = data.replace(/[^\d.-]/g, '');
            }
          }
          
          // The lab's HL7 Definition file does not define this element, give it a descriptive name.
          else {
            attribute_name += '_subcomponent' + (index.subComponent + 1);
          }
        }
        
        // If the lab's HL7 Definition file defines this element as NUMERIC, then strip out non-numeric characters - keep the negative symbol and decimal period.
        else if (hl7def[index.segment][index.fields].type[index.component].type === 'NM') {
          data = data.replace(/[^\d.-]/g, '');
        }
      }
      
      // The lab's HL7 Definition file does not define this element, give it a descriptive name.
      else {
        attribute_name += '_component' + (index.component + 1) + '_subcomponent' + (index.subComponent + 1);
      }
    }
    
    // If the lab's HL7 Definition file defines this element as NUMERIC, then strip out non-numeric characters - keep the negative symbol and decimal period.
    else if (hl7def[index.segment][index.fields].type === 'NM') {
      data = data.replace(/[^\d.-]/g, '');
    }
  }
  
  // The lab's HL7 Definition file does not define this element, give it a descriptive name.
  else {
    attribute_name = 'field' + (index.fields + 1) + '_component' + (index.component + 1) + '_subcomponent' + (index.subComponent + 1);
  }

  parsed[attribute_name] = data;
}

function isChild(segmentName, parent, hierarchy) {
  return hierarchy[parent] !== undefined
    ? hierarchy[parent].indexOf(segmentName) !== -1
    : false;
}

function parse(msg, def, hierarchy, options) {

  hierarchy = hierarchy || {};
  options = options || {};
  msg = msg.trim();

  let separator = getSeparator(msg.slice(3, 8)),
    parsedMsg = {},
    currentLocation = [],
    currentSegment;

  // Each Line in Message, separated by newlines
  msg.split(separator.segment).forEach(function(segment, segmentIndex) {

    segment = segment.trim();

    const segmentParsed = {},
      segmentName = segment.slice(0, 3);

    /*
     *  Use the 'currentSegment' variable as a pointer to keep track of where we are in the hierarchy of the segments.
     */

    // if current segment is a child of the previous segment
    // i.e. an 'OBX' that follows an 'OBR'
    if (currentLocation.length && isChild(segmentName, currentLocation[currentLocation.length - 1], hierarchy)) {

      // if an array for this segment type does not exist on the parent segment, create it
      if (currentSegment[currentSegment.length - 1][segmentName] === undefined) {
        currentSegment[currentSegment.length - 1][segmentName] = [];
      }

      // point currentSegment at the array that the current segment will be pushed to
      currentSegment = currentSegment[currentSegment.length - 1][segmentName];

      // add the segment type/name to the end of the currentLocation array
      currentLocation.push(segmentName);
    }

    // if current segment is not a child of the previous segment,
    // and is not the same type/name as the previous segment
    // i.e. an 'OBX' that follows an 'NTE'
    else if (currentLocation.length && currentLocation[currentLocation.length - 1] !== segmentName) {

      // remove elements from the end of the currentLocation array until the current segment's array is located
      while (currentLocation.length) {
        if (currentLocation[currentLocation.length - 1] !== segmentName) {
          currentLocation.pop();
        } else {
          break;
        }
      }

      // reset the currentSegment
      currentSegment = parsedMsg;

      // traverse the currentLocation array up to but not including the last element
      for (let i = 0; i < currentLocation.length - 1; i++) {
        // point currentSegment at the last array element of each parent segment
        currentSegment = currentSegment[currentLocation[i]][currentSegment[currentLocation[i]].length - 1];
      }

      // point currentSegment at the array that the current segment will be pushed to
      currentSegment = currentSegment[segmentName];
    }

    // if at the top level of the hierarchy (this should only run when processing the MSH segment)
    if (!currentLocation.length) {

      // initialize the currentLocation array
      currentLocation.push(segmentName);

      // if an array for this segment type does not exist on the parent segment, create it
      if (parsedMsg[segmentName] === undefined) {
        parsedMsg[segmentName] = [];
      }

      // point currentSegment at the array that the current segment will be pushed to
      currentSegment = parsedMsg[segmentName];
    }

    // generate parsed segment
    segment.split(separator.field).forEach(function(fields, fieldsIndex) {

      // Each Field in Line, separated by pipes
      fieldsIndex -= 1; // Skip the Segment Name (MSH, PID, etc.)

      // TODO - Create an array for Repeating Fields.
      fields.split(separator.repetition).forEach(function(field, fieldIndex) {

        // Each RepeatedField in Field, separated by carats
        field.split(separator.component).forEach(function(component, componentIndex) {

            // Each Component in RepeatedField, separated by tildes
            component.split(separator.subComponent).forEach(function(subComponent, subComponentIndex) {

                // Each SubComponent in Component, separated by ampersands
                if (fieldsIndex > 1 && subComponent.length) {
                  insertData(
                    segmentParsed,
                    def,
                    separator,
                    {
                      segment: segmentName,
                      fields: fieldsIndex,
                      field: fieldIndex,
                      component: componentIndex,
                      subComponent: subComponentIndex
                    },
                    subComponent
                  );
                }

              });

          });

      });

    });

    // push the parsed segment onto the array pointed at by currentSegment
    currentSegment.push(segmentParsed);
  });

  return parsedMsg;
}

async function getJson(hl7Data) {

  // This will by dynamic in the future
  const hl7_definition_file = 'default';
  const hl7definition = require(path.join(
    '../config/definitions/',
    hl7_definition_file + '.js'
  ));
  const hl7grammar = {
    MSH: ['PID'], // i.e. PID is a sub-record of MSH
    PID: ['PV1', 'ORC', 'NTE'],
    PV1: ['ORC'],
    ORC: ['OBR'],
    OBR: ['OBX'],
    OBX: ['NTE']
  };

  const jsonData = parse(
    hl7Data,
    hl7definition,
    hl7grammar
  );

  return jsonData;

}

module.exports = {
  getJson: getJson
};