// http://hl7-definition.caristix.com:9010/

const

  /*****************************************************************************
   * Simple Data Types
   *****************************************************************************/
  DT = 'DT', // Date
  DTM = 'DTM', // Date/Time
  FT = 'FT', // Formatted Text Data
  ID = 'ID', // Coded values for HL7 tables
  IS = 'IS', // Coded value for user-defined tables
  NM = 'NM', // Numeric
  SI = 'SI', // Sequence ID
  ST = 'ST', // String
  TS = 'TS', // Timestamp
  TX = 'TX', // Text Data
  VARIES = 'VARIES', // Variable Data Types allowed

  /*****************************************************************************
   * Complex Data Types
   *****************************************************************************/

  // HIERARCHIC DESIGNATOR
  // The basic definition of the HD is that it identifies an (administrative or
  // system or application or other) entity that has responsibility for managing
  // or assigning a defined set of instance identifiers (such as placer or
  // filler number, patient identifiers, provider identifiers, etc.). This
  // entity could be a particular health care application such as a registration
  // system that assigns patient identifiers, a governmental entity such as a
  // licensing authority that assigns professional identifiers or drivers
  // license numbers, or a facility where such identifiers are assigned.
  HD = [
    { name: 'namespace_id',      position: 1, length: 20,  type: IS, required: 'O' },
    { name: 'universal_id',      position: 2, length: 199, type: ST, required: 'C' },
    { name: 'universal_id_type', position: 3, length: 6,   type: ID, required: 'C' }
  ],

  // CODED ELEMENT
  // This data type transmits codes and the text associated with the code.
  CE = [
    { name: 'id',                              position: 1, length: 20,  type: ST, required: 'O' },
    { name: 'text',                            position: 2, length: 199, type: ST, required: 'O' },
    { name: 'name_of_coding_system',           position: 3, length: 20,  type: ID, required: 'O' },
    { name: 'alternate_id',                    position: 4, length: 20,  type: ST, required: 'O' },
    { name: 'alternate_text',                  position: 5, length: 199, type: ST, required: 'O' },
    { name: 'name_of_alternate_coding_system', position: 6, length: 20,  type: ID, required: 'O' }
  ],

  // CODED WITH NO EXCEPTIONS
  // Specifies a coded element and its associated detail. The CNE data type is
  // used when a required or mandatory coded field is needed. The specified HL7
  // or externally defined table must be used and may not be extended with local
  // values. Text may not replace the code. A CNE field must have an HL7 defined
  // or external table associated with it. It must be specified in the standard.
  CNE = [
    { name: 'id',                                 position: 1, length: 20,  type: ST, required: 'R' },
    { name: 'text',                               position: 2, length: 199, type: ST, required: 'O' },
    { name: 'name_of_coding_system',              position: 3, length: 20,  type: ID, required: 'O' },
    { name: 'alternate_id',                       position: 4, length: 20,  type: ST, required: 'O' },
    { name: 'alternate_text',                     position: 5, length: 199, type: ST, required: 'O' },
    { name: 'name_of_alternate_coding_system',    position: 6, length: 20,  type: ID, required: 'O' },
    { name: 'coding_system_version_id',           position: 7, length: 10,  type: ST, required: 'C' },
    { name: 'alternate_coding_system_version_id', position: 8, length: 10,  type: ST, required: 'O' },
    { name: 'original_text',                      position: 9, length: 199, type: ST, required: 'O' }
  ],

  // Composite ID Number and Name Simplified
  // Specifies a person using both an identifier and the persons name
  CNN = [
    { name: 'id_number',                             position: 1,  length: 15,  type: ST, required: 'O' },
    { name: 'family_name',                           position: 2,  length: 50,  type: ST, required: 'O' },
    { name: 'given_name',                            position: 3,  length: 30,  type: ST, required: 'O' },
    { name: 'second_names',                          position: 4,  length: 30,  type: ST, required: 'O' },
    { name: 'suffix',                                position: 5,  length: 20,  type: ST, required: 'O' },
    { name: 'prefix',                                position: 6,  length: 20,  type: ST, required: 'O' },
    { name: 'degree',                                position: 7,  length: 5,   type: IS, required: 'O' },
    { name: 'source_table',                          position: 8,  length: 4,   type: IS, required: 'C' },
    { name: 'assigning_authority_namespace_id',      position: 9,  length: 20,  type: IS, required: 'C' },
    { name: 'assigning_authority_universal_id',      position: 10, length: 199, type: ST, required: 'C' },
    { name: 'assigning_authority_universal_id_type', position: 11, length: 6,   type: ID, required: 'C' }
  ],

  // COMPOSITE QUANTITY WITH UNITS
  CQ = [
    { name: 'quantity', position: 1, length: 16, type: NM, required: 'O' },
    { name: 'units',    position: 2, length: 483, type: ST, required: 'O' }
  ],

  // CODED WITH EXCEPTIONS
  // Specifies a coded element and its associated detail. The CWE data type is
  // used when 1) more than one table may be applicable or 2) the specified HL7
  // or externally defined table may be extended with local values or 3) when
  // text is in place, the code may be omitted.
  CWE = [
    { name: 'id',                                 position: 1, length: 20,  type: ST, required: 'O' },
    { name: 'text',                               position: 2, length: 199, type: ST, required: 'O' },
    { name: 'name_of_coding_system',              position: 3, length: 20,  type: ID, required: 'O' },
    { name: 'alternate_id',                       position: 4, length: 20,  type: ST, required: 'O' },
    { name: 'alternate_text',                     position: 5, length: 199, type: ST, required: 'O' },
    { name: 'name_of_alternate_coding_system',    position: 6, length: 20,  type: ID, required: 'O' },
    { name: 'coding_system_version_id',           position: 7, length: 10,  type: ST, required: 'C' },
    { name: 'alternate_coding_system_version_id', position: 8, length: 10,  type: ST, required: 'O' },
    { name: 'original_text',                      position: 9, length: 199, type: ST, required: 'O' }
  ],

  // EXTENDED COMPOSITE ID WITH CHECK DIGIT
  // This data type is used for specifying an identifier with its associated
  // administrative detail.
  CX = [
    { name: 'id_number',                      position: 1,  length: 15,  type: ST,  required: 'R' },
    { name: 'check_digit',                    position: 2,  length: 1,   type: ST,  required: 'O' },
    { name: 'check_digit_scheme',             position: 3,  length: 3,   type: ID,  required: 'O' },
    { name: 'assigning_authority',            position: 4,  length: 227, type: HD,  required: 'O' },
    { name: 'id_type_code',                   position: 5,  length: 5,   type: ID,  required: 'O' },
    { name: 'assigning_facility',             position: 6,  length: 227, type: HD,  required: 'O' },
    { name: 'effective_date',                 position: 7,  length: 8,   type: DT,  required: 'O' },
    { name: 'expiration_date',                position: 8,  length: 8,   type: DT,  required: 'O' },
    { name: 'assigning_jurisdiction',         position: 9,  length: 705, type: CWE, required: 'O' },
    { name: 'assigning_agency_or_department', position: 10, length: 705, type: CWE, required: 'O' }
  ],

  // DRIVER'S LICENSE NUMBER
  // This field contains the drivers license information. For state or province
  // refer to official postal codes for that country; for country refer to ISO
  // 3166 for codes.
  DLN = [
    { name: 'license_number',                 position: 1, length: 20, type: ST, required: 'R' },
    { name: 'issuing_state_province_country', position: 2, length: 20, type: IS, required: 'O' },
    { name: 'expiration_date',                position: 3, length: 24, type: DT, required: 'O' }
  ],

  // DATE/TIME RANGE
  DR = [
    { name: 'range_start_datetime', position: 1, length: 26, type: DTM, required: 'O' },
    { name: 'range_end_datetime',   position: 2, length: 26, type: DTM, required: 'O' }
  ],

  // ENTITY ID
  // The entity identifier defines a given entity within a specified series of
  // identifiers.
  EI = [
    { name: 'entity_id',         position: 1, length: 199, type: ST, required: 'O' },
    { name: 'namespace_id',      position: 2, length: 20,  type: IS, required: 'O' },
    { name: 'universal_id',      position: 3, length: 199, type: ST, required: 'C' },
    { name: 'universal_id_type', position: 4, length: 6,   type: ID, required: 'C' }
  ],

  // ENTITY ID PAIR
  // Specifies an identifier assigned to an entity by either the placer or the
  // filler system. If both components are populated the identifiers must refer
  // to the same entity.
  EIP = [
    { name: 'placer_assigned_id', position: 1, length: 427, type: EI, required: 'O' },
    { name: 'filler_assigned_id', position: 2, length: 427, type: EI, required: 'O' }
  ],

  // FAMILY NAME
  // This data type allows full specification of the surname of a person. Where
  // appropriate, it differentiates the person's own surname from that of the
  // person's partner or spouse, in cases where the person's name may contain
  // elements from either name. It also permits messages to distinguish the
  // surname prefix (such as "van" or "de") from the surname root.
  FN = [
    { name: 'surname',                            position: 1, length: 50, type: ST, required: 'R' },
    { name: 'own_surname_prefix',                 position: 2, length: 20, type: ST, required: 'O' },
    { name: 'own_surname',                        position: 3, length: 50, type: ST, required: 'O' },
    { name: 'surname_prefix_from_partner_spouse', position: 4, length: 20, type: ST, required: 'O' },
    { name: 'surname_from_partner_spouse',        position: 5, length: 50, type: ST, required: 'O' }
  ],

  // MONEY
  // This data type specifies an amount of money and the denomination in which it
  // is expressed.
  MO = [
    { name: 'quantity',     position: 1, length: 16, type: NM, required: 'O' },
    { name: 'denomination', position: 2, length: 3,  type: ID, required: 'O' }
  ],

  // MONEY AND CODE
  // Transmits monetary information and the associated charge code for services
  // performed.
  MOC = [
    { name: 'monetary_amount', position: 1, length: 20,  type: MO, required: 'O' },
    { name: 'charge_code',     position: 2, length: 483, type: CE, required: 'O' }
  ],

  // MESSAGE TYPE
  // This field contains the message type, trigger event, and the message
  // structure ID for the message.
  MSG = [
    { name: 'message_code',      position: 1, length: 20,  type: IS, required: 'O' },
    { name: 'trigger_event',     position: 2, length: 199, type: ST, required: 'C' },
    { name: 'message_structure', position: 3, length: 6,   type: ID, required: 'C' }
  ],

  // NAME WITH DATE AND LOCATION
  // Specifies the name of the person performing a service, when the person
  // performed the service and where the person performed the service.
  NDL = [
    { name: 'name',                  position: 1,  length: 406, type: CNN, required: 'O' },
    { name: 'start_datetime',        position: 2,  length: 26,  type: TS,  required: 'O' },
    { name: 'end_datetime',          position: 3,  length: 26,  type: TS,  required: 'O' },
    { name: 'point_of_care',         position: 4,  length: 20,  type: IS,  required: 'O' },
    { name: 'room',                  position: 5,  length: 20,  type: IS,  required: 'O' },
    { name: 'bed',                   position: 6,  length: 20,  type: IS,  required: 'O' },
    { name: 'facility',              position: 7,  length: 227, type: HD,  required: 'O' },
    { name: 'location_status',       position: 8,  length: 20,  type: IS,  required: 'O' },
    { name: 'patient_location_type', position: 9,  length: 20,  type: IS,  required: 'O' },
    { name: 'building',              position: 10, length: 20,  type: IS,  required: 'O' },
    { name: 'floor',                 position: 11, length: 20,  type: IS,  required: 'O' }
  ],

  // ORDER SEQUENCE DEFINITION
  // This data type specifies a fully coded version for forming a relationship
  // between an order and one or more other orders. The relationship may be
  // sequential or a cyclical pattern.
  OSD = [
    { name: 'sequence_results_flag',                 position: 1,  length: 1,  type: ID, required: 'R' },
    { name: 'placer_order_number_entity_identifier', position: 2,  length: 15, type: ST, required: 'R' },
    { name: 'placer_order_number_namespace_id',      position: 3,  length: 6,  type: IS, required: 'O' },
    { name: 'filler_order_number_entity_identifier', position: 4,  length: 15, type: ST, required: 'R' },
    { name: 'filler_order_number_namespace_id',      position: 5,  length: 6,  type: IS, required: 'O' },
    { name: 'sequence_condition_value',              position: 6,  length: 12, type: ST, required: 'O' },
    { name: 'maximum_number_of_repeats',             position: 7,  length: 3,  type: NM, required: 'O' },
    { name: 'placer_order_number_universal_id',      position: 8,  length: 15, type: ST, required: 'R' },
    { name: 'placer_order_number_universal_id_type', position: 9,  length: 6,  type: ID, required: 'O' },
    { name: 'filler_order_number_universal_id',      position: 10, length: 15, type: ST, required: 'R' },
    { name: 'filler_order_number_universal_id_type', position: 11, length: 6,  type: ID, required: 'O' }
  ],

  // PERSON LOCATION
  // This data type is used to specify a patient location within a healthcare
  // institution. Which components are valued depends on the needs of the site.
  // For example for a patient treated at home, only the person location type is
  // valued. It is most commonly used for specifying patient locations, but may
  // refer to other types of persons within a healthcare setting.
  PL = [
    { name: 'point_of_care',                    position: 1,  length: 20,  type: IS, required: 'O' },
    { name: 'room',                             position: 2,  length: 20,  type: IS, required: 'O' },
    { name: 'bed',                              position: 3,  length: 20,  type: IS, required: 'O' },
    { name: 'facility',                         position: 4,  length: 227, type: HD, required: 'O' },
    { name: 'location_status',                  position: 5,  length: 20,  type: IS, required: 'O' },
    { name: 'person_location_type',             position: 6,  length: 20,  type: IS, required: 'C' },
    { name: 'building',                         position: 7,  length: 20,  type: IS, required: 'O' },
    { name: 'floor',                            position: 8,  length: 20,  type: IS, required: 'O' },
    { name: 'location_description',             position: 9,  length: 199, type: ST, required: 'O' },
    { name: 'comprehensive_location_id',        position: 10, length: 427, type: EI, required: 'O' },
    { name: 'assigning_authority_for_location', position: 11, length: 227, type: HD, required: 'O' }
  ],

  // PARENT RESULT LINK
  // Uniquely identifies the parent results OBX segment related to the current
  // order, together with the information in OBR-29-parent.
  PRL = [
    { name: 'parent_observation_id',               position: 1, length: 483, type: CE, required: 'R' },
    { name: 'parent_observation_sub_id',           position: 2, length: 20,  type: ST, required: 'O' },
    { name: 'parent_observation_value_descriptor', position: 3, length: 250, type: TX, required: 'O' }
  ],

  // PROCESSING TYPE
  // This data type indicates whether to process a message as defined in HL7
  // Application (level 7) Processing rules.
  PT = [
    { name: 'processing_id',   position: 1, length: 1, type: ID, required: 'O' },
    { name: 'processing_mode', position: 2, length: 1, type: ID, required: 'O' }
  ],

  // REPEAT INTERVAL
  // Contains the interval between repeated services.
  RI = [
    { name: 'Repeat Pattern',         position: 1, length: 6,   type: IS, required: 'O' },
    { name: 'Explicit Time Interval', position: 2, length: 199, type: ST, required: 'O' }
  ],

  // STREET ADDRESS
  // This data type specifies an entity's street address and associated detail.
  SAD = [
    { name: 'street_address',  position: 1, length: 120, type: ST, required: 'O' },
    { name: 'street_name',     position: 2, length: 50,  type: ST, required: 'O' },
    { name: 'dwelling_number', position: 3, length: 12,  type: ST, required: 'O' }
  ],

  // SPECIMEN SOURCE
  // This data type identifies the site where the specimen should be obtained or
  // where the service should be performed.
  SPS = [
    { name: 'specimen_source_name_or_code',    position: 1, length: 705, type: CWE, required: 'O' },
    { name: 'additives',                       position: 2, length: 705, type: CWE, required: 'O' },
    { name: 'specimen_collection_method',      position: 3, length: 200, type: TX,  required: 'O' },
    { name: 'body_site',                       position: 4, length: 705, type: CWE, required: 'O' },
    { name: 'site_modifier',                   position: 5, length: 705, type: CWE, required: 'O' },
    { name: 'collection_method_modifier_code', position: 6, length: 705, type: CWE, required: 'O' },
    { name: 'specimen_role',                   position: 7, length: 705, type: CWE, required: 'O' }
  ],

  // TIMING QUANTITY
  // Describes when a service should be performed and how frequently.
  TQ = [
    { name: 'quantity',            position: 1,  length: 267, type: CQ,  required: 'O' },
    { name: 'interval',            position: 2,  length: 206, type: RI,  required: 'O' },
    { name: 'duration',            position: 3,  length: 6,   type: ST,  required: 'O' },
    { name: 'start_datetime',      position: 4,  length: 26,  type: TS,  required: 'O' },
    { name: 'end_datetime',        position: 5,  length: 26,  type: TS,  required: 'O' },
    { name: 'priority',            position: 6,  length: 6,   type: ST,  required: 'O' },
    { name: 'condition',           position: 7,  length: 199, type: ST,  required: 'O' },
    { name: 'text',                position: 8,  length: 200, type: TX,  required: 'O' },
    { name: 'conjunction',         position: 9,  length: 1,   type: ID,  required: 'O' },
    { name: 'order_sequencing',    position: 10, length: 110, type: OSD, required: 'O' },
    { name: 'occurrence_duration', position: 11, length: 483, type: CE,  required: 'O' },
    { name: 'total_occurrences',   position: 12, length: 4,   type: NM,  required: 'O' }
  ],

  // VERSION IDENTIFIER
  VID = [
    { name: 'version_id',                position: 1, length: 5,   type: ID, required: 'O' },
    { name: 'internationalization_code', position: 2, length: 483, type: CE, required: 'O' },
    { name: 'international_version_id',  position: 3, length: 483, type: CE, required: 'O' }
  ],

  // EXTENDED ADDRESS
  // This data type specifies the address of a person, place or organization
  // plus associated information.
  XAD = [
    { name: 'street_address',               position: 1,  length: 184, type: SAD, required: 'O' },
    { name: 'other_designation',            position: 2,  length: 120, type: ST,  required: 'O' },
    { name: 'city',                         position: 3,  length: 50,  type: ST,  required: 'O' },
    { name: 'state_or_province',            position: 4,  length: 50,  type: ST,  required: 'O' },
    { name: 'zip_or_postal_code',           position: 5,  length: 12,  type: ST,  required: 'O' },
    { name: 'country',                      position: 6,  length: 3,   type: ID,  required: 'O' },
    { name: 'address_type',                 position: 7,  length: 3,   type: ID,  required: 'O' },
    { name: 'other_geographic_designation', position: 8,  length: 50,  type: ST,  required: 'O' },
    { name: 'county_parish_code',           position: 9,  length: 20,  type: IS,  required: 'O' },
    { name: 'census_tract',                 position: 10, length: 20,  type: IS,  required: 'O' },
    { name: 'address_representation_code',  position: 11, length: 1,   type: ID,  required: 'O' },
    { name: 'address_validity_range',       position: 12, length: 53,  type: DR,  required: 'B' },
    { name: 'effective_date',               position: 13, length: 26,  type: TS,  required: 'O' },
    { name: 'expiration_date',              position: 14, length: 26,  type: TS,  required: 'O' }
  ],

  // EXTENDED COMPOSITE ID NUMBER AND NAME FOR PERSONS
  XCN = [
    { name: 'id_number',                      position: 1,  length: 15,  type: ST,  required: 'O' },
    { name: 'family_name',                    position: 2,  length: 194, type: FN,  required: 'O' },
    { name: 'given_name',                     position: 3,  length: 30,  type: ST,  required: 'O' },
    { name: 'second_names',                   position: 4,  length: 30,  type: ST,  required: 'O' },
    { name: 'suffix',                         position: 5,  length: 20,  type: ST,  required: 'O' },
    { name: 'prefix',                         position: 6,  length: 20,  type: ST,  required: 'O' },
    { name: 'degree',                         position: 7,  length: 5,   type: IS,  required: 'B' },
    { name: 'source_table',                   position: 8,  length: 4,   type: IS,  required: 'C' },
    { name: 'assigning_authority',            position: 9,  length: 227, type: HD,  required: 'O' },
    { name: 'name_type_code',                 position: 10, length: 1,   type: ID,  required: 'O' },
    { name: 'id_check_digit',                 position: 11, length: 1,   type: ST,  required: 'O' },
    { name: 'check_digit_scheme',             position: 12, length: 3,   type: ID,  required: 'C' },
    { name: 'id_type_code',                   position: 13, length: 5,   type: ID,  required: 'O' },
    { name: 'assigning_facility',             position: 14, length: 227, type: HD,  required: 'O' },
    { name: 'name_representation_code',       position: 15, length: 1,   type: ID,  required: 'O' },
    { name: 'name_context',                   position: 16, length: 483, type: CE,  required: 'O' },
    { name: 'name_validity_range',            position: 17, length: 53,  type: DR,  required: 'B' },
    { name: 'name_assembly_order',            position: 18, length: 1,   type: ID,  required: 'O' },
    { name: 'effective_date',                 position: 19, length: 26,  type: TS,  required: 'O' },
    { name: 'expiration_date',                position: 20, length: 26,  type: TS,  required: 'O' },
    { name: 'professional_suffix',            position: 21, length: 199, type: ST,  required: 'O' },
    { name: 'assigning_jurisdiction',         position: 22, length: 705, type: CWE, required: 'O' },
    { name: 'assigning_agency_or_department', position: 23, length: 705, type: CWE, required: 'O' }
  ],

  // EXTENDED COMPOSITE NAME AND IDENTIFICATION NUMBER FOR ORGANIZATIONS
  // This data type is used in fields (e.g., PV2-23, NK1-13, PD1-3, OBR-44) to
  // specify the name and ID number of an organization.
  XON = [
    { name: 'organization_name',           position: 1,  length: 50,  type: ST, required: 'O' },
    { name: 'organization_name_type_code', position: 2,  length: 20,  type: IS, required: 'O' },
    { name: 'id_number',                   position: 3,  length: 4,   type: NM, required: 'B' },
    { name: 'check_digit',                 position: 4,  length: 1,   type: NM, required: 'O' },
    { name: 'check_digit_scheme',          position: 5,  length: 3,   type: ID, required: 'O' },
    { name: 'assigning_authority',         position: 6,  length: 227, type: HD, required: 'O' },
    { name: 'id_type_code',                position: 7,  length: 5,   type: ID, required: 'O' },
    { name: 'assigning_facility',          position: 8,  length: 227, type: HD, required: 'O' },
    { name: 'name_representation_code',    position: 9,  length: 1,   type: ID, required: 'O' },
    { name: 'organization_id',             position: 10, length: 20,  type: ST, required: 'O' }
  ],

  // EXTENDED PERSON NAME
  XPN = [
    { name: 'family_name',              position: 1,  length: 194, type: FN, required: 'O' },
    { name: 'given_name',               position: 2,  length: 30,  type: ST, required: 'O' },
    { name: 'second_names',             position: 3,  length: 30,  type: ST, required: 'O' },
    { name: 'suffix',                   position: 4,  length: 20,  type: ST, required: 'O' },
    { name: 'prefix',                   position: 5,  length: 20,  type: ST, required: 'O' },
    { name: 'degree',                   position: 6,  length: 6,   type: IS, required: 'B' },
    { name: 'name_type_code',           position: 7,  length: 1,   type: ID, required: 'O' },
    { name: 'name_representation_code', position: 8,  length: 1,   type: ID, required: 'O' },
    { name: 'name_context',             position: 9,  length: 483, type: CE, required: 'O' },
    { name: 'name_validity_range',      position: 10, length: 53,  type: DR, required: 'B' },
    { name: 'name_assembly_order',      position: 11, length: 1,   type: ID, required: 'O' },
    { name: 'effective_date',           position: 12, length: 26,  type: TS, required: 'O' },
    { name: 'expiration_date',          position: 13, length: 26,  type: TS, required: 'O' },
    { name: 'professional_suffix',      position: 14, length: 199, type: ST, required: 'O' }
  ],

  // EXTENDED TELECOMMUNICATION NUMBER
  XTN = [
    { name: 'telephone_number',                 position: 1,  length: 199, type: ST, required: 'B' },
    { name: 'telecommunication_use_code',       position: 2,  length: 3,   type: ID, required: 'O' },
    { name: 'telecommunication_equipment_type', position: 3,  length: 8,   type: ID, required: 'O' },
    { name: 'email_address',                    position: 4,  length: 199, type: ST, required: 'O' },
    { name: 'country_code',                     position: 5,  length: 3,   type: NM, required: 'O' },
    { name: 'area_city_code',                   position: 6,  length: 5,   type: NM, required: 'O' },
    { name: 'local_number',                     position: 7,  length: 9,   type: NM, required: 'O' },
    { name: 'extension',                        position: 8,  length: 5,   type: NM, required: 'O' },
    { name: 'any_text',                         position: 9,  length: 199, type: ST, required: 'O' },
    { name: 'extension_prefix',                 position: 10, length: 4,   type: ST, required: 'O' },
    { name: 'speed_dial_code',                  position: 11, length: 6,   type: ST, required: 'O' },
    { name: 'unformatted_telephone_number',     position: 12, length: 199, type: ST, required: 'C' }
  ],
  /*****************************************************************************
 Component (line) Definitions
 *****************************************************************************/

  // MESSAGE HEADER
  // The MSH segment defines the intent, source, destination, and some
  // specifics of the syntax of a message.
  MSH = [
    { name: 'encoding_characters',                     position: 2,  length: 4,   type: ST,  required: 'R', repeat: 1 },
    { name: 'sending_application',                     position: 3,  length: 227, type: HD,  required: 'O', repeat: 1 },
    { name: 'sending_facility',                        position: 4,  length: 227, type: HD,  required: 'O', repeat: 1 },
    { name: 'receiving_application',                   position: 5,  length: 227, type: HD,  required: 'O', repeat: 1 },
    { name: 'receiving_facility',                      position: 6,  length: 227, type: HD,  required: 'O', repeat: 1 },
    { name: 'datetime_of_message',                     position: 7,  length: 26,  type: TS,  required: 'R', repeat: 1 },
    { name: 'security',                                position: 8,  length: 40,  type: ST,  required: 'O', repeat: 1 },
    { name: 'message_type',                            position: 9,  length: 15,  type: MSG, required: 'R', repeat: 1 },
    { name: 'message_control_id',                      position: 10, length: 20,  type: ST,  required: 'R', repeat: 1 },
    { name: 'processing_id',                           position: 11, length: 3,   type: PT,  required: 'R', repeat: 1 },
    { name: 'version_id',                              position: 12, length: 60,  type: VID, required: 'R', repeat: 1 },
    { name: 'sequence_number',                         position: 13, length: 15,  type: NM,  required: 'O', repeat: 1 },
    { name: 'continuation_pointer',                    position: 14, length: 180, type: ST,  required: 'O', repeat: 1 },
    { name: 'accept_acknowledgment_type',              position: 15, length: 2,   type: ID,  required: 'O', repeat: 1 },
    { name: 'application_acknowledgment_type',         position: 16, length: 2,   type: ID,  required: 'O', repeat: 1 },
    { name: 'country_code',                            position: 17, length: 3,   type: ID,  required: 'O', repeat: 1 },
    { name: 'character_set',                           position: 18, length: 16,  type: ID,  required: 'O', repeat: 0 },
    { name: 'principal_language_of_message',           position: 19, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'alternate_character_set_handling_scheme', position: 20, length: 20,  type: ID,  required: 'O', repeat: 1 },
    { name: 'message_profile_id',                      position: 21, length: 427, type: EI,  required: 'O', repeat: 0 }
  ],

  // PATIENT IDENTIFICATION
  // The PID segment is used by all applications as the primary means of
  // communicating patient identification information. This segment contains
  // permanent patient identifying and demographic information that, for the
  // most part, is not likely to change frequently.
  PID = [
    { name: 'set_id',                         position: 1,  length: 4,   type: SI,  required: 'O', repeat: 1 },
    { name: 'patient_id',                     position: 2,  length: 20,  type: CX,  required: 'B', repeat: 1 },
    { name: 'patient_id_list',                position: 3,  length: 250, type: CX,  required: 'R', repeat: 0 },
    { name: 'alternate_patient_id',           position: 4,  length: 20,  type: CX,  required: 'B', repeat: 0 },
    { name: 'patient_name',                   position: 5,  length: 250, type: XPN, required: 'R', repeat: 0 },
    { name: 'mothers_maiden_name',            position: 6,  length: 250, type: XPN, required: 'O', repeat: 0 },
    { name: 'datetime_of_birth',              position: 7,  length: 26,  type: TS,  required: 'O', repeat: 1 },
    { name: 'administrative_sex',             position: 8,  length: 1,   type: IS,  required: 'O', repeat: 1 },
    { name: 'patient_alias',                  position: 9,  length: 250, type: XPN, required: 'B', repeat: 0 },
    { name: 'race',                           position: 10, length: 250, type: CE,  required: 'O', repeat: 0 },
    { name: 'patient_address',                position: 11, length: 250, type: XAD, required: 'O', repeat: 0 },
    { name: 'county_code',                    position: 12, length: 4,   type: IS,  required: 'B', repeat: 1 },
    { name: 'phone_number_home',              position: 13, length: 250, type: XTN, required: 'O', repeat: 0 },
    { name: 'phone_number_business',          position: 14, length: 250, type: XTN, required: 'O', repeat: 0 },
    { name: 'primary_language',               position: 15, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'marital_status',                 position: 16, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'religion',                       position: 17, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'patient_account_number',         position: 18, length: 250, type: CX,  required: 'O', repeat: 1 },
    { name: 'ssn_number_patient',             position: 19, length: 16,  type: ST,  required: 'B', repeat: 1 },
    { name: 'drivers_license_number_patient', position: 20, length: 25,  type: DLN, required: 'B', repeat: 1 },
    { name: 'mothers_id',                     position: 21, length: 250, type: CX,  required: 'O', repeat: 0 },
    { name: 'ethnic_group',                   position: 22, length: 250, type: CE,  required: 'O', repeat: 0 },
    { name: 'birth_place',                    position: 23, length: 250, type: ST,  required: 'O', repeat: 1 },
    { name: 'multiple_birth_indicator',       position: 24, length: 1,   type: ID,  required: 'O', repeat: 1 },
    { name: 'birth_order',                    position: 25, length: 2,   type: NM,  required: 'O', repeat: 1 },
    { name: 'citizenship',                    position: 26, length: 250, type: CE,  required: 'O', repeat: 0 },
    { name: 'veterans_military_status',       position: 27, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'nationality',                    position: 28, length: 250, type: CE,  required: 'B', repeat: 1 },
    { name: 'patient_death_date_and_time',    position: 29, length: 26,  type: TS,  required: 'O', repeat: 1 },
    { name: 'patient_death_indicator',        position: 30, length: 1,   type: ID,  required: 'O', repeat: 1 },
    { name: 'identity_unknown_indicator',     position: 31, length: 1,   type: ID,  required: 'O', repeat: 1 },
    { name: 'identity_reliability_code',      position: 32, length: 20,  type: IS,  required: 'O', repeat: 0 },
    { name: 'last_update_datetime',           position: 33, length: 26,  type: TS,  required: 'O', repeat: 1 },
    { name: 'last_update_facility',           position: 34, length: 241, type: HD,  required: 'O', repeat: 1 },
    { name: 'species_code',                   position: 35, length: 250, type: CE,  required: 'C', repeat: 1 },
    { name: 'breed_code',                     position: 36, length: 250, type: CE,  required: 'C', repeat: 1 },
    { name: 'strain',                         position: 37, length: 80,  type: ST,  required: 'O', repeat: 1 },
    { name: 'production_class_code',          position: 38, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'tribal_citizenship',             position: 39, length: 250, type: CWE, required: 'O', repeat: 0 }
  ],

  // COMMON ORDER
  // The Common Order segment (ORC) is used to transmit fields that are common
  // to all orders (all types of services that are requested). The ORC segment
  // is required in the Order (ORM) message. ORC is mandatory in Order
  // Acknowledgment (ORR) messages if an order detail segment is present, but
  // is not required otherwise.
  ORC = [
    { name: 'order_control',                               position: 1,  length: 2,   type: ID,  required: 'R', repeat: 1 },
    { name: 'placer_order_number',                         position: 2,  length: 22,  type: EI,  required: 'C', repeat: 1 },
    { name: 'filler_order_number',                         position: 3,  length: 22,  type: EI,  required: 'C', repeat: 1 },
    { name: 'placer_group_number',                         position: 4,  length: 22,  type: EI,  required: 'O', repeat: 1 },
    { name: 'order_status',                                position: 5,  length: 2,   type: ID,  required: 'O', repeat: 1 },
    { name: 'response_flag',                               position: 6,  length: 1,   type: ID,  required: 'O', repeat: 1 },
    { name: 'quantity_timing',                             position: 7,  length: 200, type: TQ,  required: 'B', repeat: 0 },
    { name: 'parent_order',                                position: 8,  length: 200, type: EIP, required: 'O', repeat: 1 },
    { name: 'datetime_of_transaction',                     position: 9,  length: 26,  type: TS,  required: 'O', repeat: 1 },
    { name: 'entered_by',                                  position: 10, length: 250, type: XCN, required: 'O', repeat: 0 },
    { name: 'verified_by',                                 position: 11, length: 250, type: XCN, required: 'O', repeat: 0 },
    { name: 'ordering_provider',                           position: 12, length: 250, type: XCN, required: 'O', repeat: 0 },
    { name: 'enterers_location',                           position: 13, length: 80,  type: PL,  required: 'O', repeat: 1 },
    { name: 'call_back_phone_number',                      position: 14, length: 250, type: XTN, required: 'O', repeat: 0 },
    { name: 'order_effective_datetime',                    position: 15, length: 26,  type: TS,  required: 'O', repeat: 1 },
    { name: 'order_control_code_reason',                   position: 16, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'entering_organization',                       position: 17, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'entering_device',                             position: 18, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'action_by',                                   position: 19, length: 250, type: XCN, required: 'O', repeat: 0 },
    { name: 'advanced_beneficiary_notice_code',            position: 20, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'ordering_facility_name',                      position: 21, length: 250, type: XON, required: 'O', repeat: 0 },
    { name: 'ordering_facility_address',                   position: 22, length: 250, type: XAD, required: 'O', repeat: 0 },
    { name: 'ordering_facility_phone_number',              position: 23, length: 250, type: XTN, required: 'O', repeat: 0 },
    { name: 'ordering_provider_address',                   position: 24, length: 250, type: XAD, required: 'O', repeat: 0 },
    { name: 'order_status_modifier',                       position: 25, length: 250, type: CWE, required: 'O', repeat: 1 },
    { name: 'advanced_beneficiary_notice_override_reason', position: 26, length: 60,  type: CWE, required: 'C', repeat: 1 },
    { name: 'fillers_expected_availability_datetime',      position: 27, length: 26,  type: TS,  required: 'O', repeat: 1 },
    { name: 'confidentiality_code',                        position: 28, length: 250, type: CWE, required: 'O', repeat: 1 },
    { name: 'order_type',                                  position: 29, length: 250, type: CWE, required: 'O', repeat: 1 },
    { name: 'enterer_authorization_mode',                  position: 30, length: 250, type: CNE, required: 'O', repeat: 1 }
  ],

  // OBSERVATION REQUEST
  // General (taken from ASTM E1238)
  OBR = [
    { name: 'set_id',                                         position: 1,  length: 4,   type: SI,  required: 'O', repeat: 1 },
    { name: 'placer_order_number',                            position: 2,  length: 22,  type: EI,  required: 'C', repeat: 1 },
    { name: 'filler_order_number',                            position: 3,  length: 22,  type: EI,  required: 'C', repeat: 1 },
    { name: 'universal_service_id',                           position: 4,  length: 250, type: CE,  required: 'R', repeat: 1 },
    { name: 'priority',                                       position: 5,  length: 2,   type: ID,  required: 'B', repeat: 1 },
    { name: 'requested_datetime',                             position: 6,  length: 26,  type: TS,  required: 'B', repeat: 1 },
    { name: 'observation_datetime',                           position: 7,  length: 26,  type: TS,  required: 'C', repeat: 1 },
    { name: 'observation_end_datetime',                       position: 8,  length: 26,  type: TS,  required: 'O', repeat: 1 },
    { name: 'collection_volume',                              position: 9,  length: 20,  type: CQ,  required: 'O', repeat: 1 },
    { name: 'collector_id',                                   position: 10, length: 250, type: XCN, required: 'O', repeat: 0 },
    { name: 'specimen_action_code',                           position: 11, length: 1,   type: ID,  required: 'O', repeat: 1 },
    { name: 'danger_code',                                    position: 12, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'relevant_clinical_information',                  position: 13, length: 300, type: ST,  required: 'O', repeat: 1 },
    { name: 'specimen_received_datetime',                     position: 14, length: 26,  type: TS,  required: 'B', repeat: 1 },
    { name: 'specimen_source',                                position: 15, length: 300, type: SPS, required: 'B', repeat: 1 },
    { name: 'ordering_provider',                              position: 16, length: 250, type: XCN, required: 'O', repeat: 0 },
    { name: 'order_callback_phone_number',                    position: 17, length: 250, type: XTN, required: 'O', repeat: 0 },
    { name: 'placer_field_1',                                 position: 18, length: 60,  type: ST,  required: 'O', repeat: 1 },
    { name: 'placer_field_2',                                 position: 19, length: 60,  type: ST,  required: 'O', repeat: 1 },
    { name: 'filler_field_1',                                 position: 20, length: 60,  type: ST,  required: 'O', repeat: 1 },
    { name: 'filler_field_2',                                 position: 21, length: 60,  type: ST,  required: 'O', repeat: 1 },
    { name: 'results_rpt_status_chng_datetime',               position: 22, length: 26,  type: TS,  required: 'C', repeat: 1 },
    { name: 'charge_to_practice',                             position: 23, length: 40,  type: MOC, required: 'O', repeat: 1 },
    { name: 'diagnostic_serv_sect_id',                        position: 24, length: 10,  type: ID,  required: 'O', repeat: 1 },
    { name: 'result_status',                                  position: 25, length: 1,   type: ID,  required: 'C', repeat: 1 },
    { name: 'parent_result',                                  position: 26, length: 400, type: PRL, required: 'O', repeat: 1 },
    { name: 'quantity_timing',                                position: 27, length: 200, type: TQ,  required: 'B', repeat: 0 },
    { name: 'result_copies_to',                               position: 28, length: 250, type: XCN, required: 'O', repeat: 0 },
    { name: 'parent_number',                                  position: 29, length: 200, type: EIP, required: 'O', repeat: 1 },
    { name: 'transportation_mode',                            position: 30, length: 20,  type: ID,  required: 'O', repeat: 1 },
    { name: 'reason_for_study',                               position: 31, length: 250, type: CE,  required: 'O', repeat: 0 },
    { name: 'principal_result_interpreter',                   position: 32, length: 200, type: NDL, required: 'O', repeat: 1 },
    { name: 'assistant_result_interpreter',                   position: 33, length: 200, type: NDL, required: 'O', repeat: 0 },
    { name: 'technician',                                     position: 34, length: 200, type: NDL, required: 'O', repeat: 0 },
    { name: 'transcriptionist',                               position: 35, length: 200, type: NDL, required: 'O', repeat: 0 },
    { name: 'scheduled_datetime',                             position: 36, length: 26,  type: TS,  required: 'O', repeat: 1 },
    { name: 'number_of_sample_containers',                    position: 37, length: 4,   type: NM,  required: 'O', repeat: 1 },
    { name: 'transport_logistics_of_collected_sample',        position: 38, length: 250, type: CE,  required: 'O', repeat: 0 },
    { name: 'collectors_comment',                             position: 39, length: 250, type: CE,  required: 'O', repeat: 0 },
    { name: 'transport_arrangement_responsibility',           position: 40, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'transport_arranged',                             position: 41, length: 30,  type: ID,  required: 'O', repeat: 1 },
    { name: 'escort_required',                                position: 42, length: 1,   type: ID,  required: 'O', repeat: 1 },
    { name: 'planned_patient_transport_comment',              position: 43, length: 250, type: CE,  required: 'O', repeat: 0 },
    { name: 'procedure_code',                                 position: 44, length: 250, type: CE,  required: 'O', repeat: 1 },
    { name: 'procedure_code_modifier',                        position: 45, length: 250, type: CE,  required: 'O', repeat: 0 },
    { name: 'placer_supplemental_service_information',        position: 46, length: 250, type: CE,  required: 'O', repeat: 0 },
    { name: 'filler_supplemental_service_information',        position: 47, length: 250, type: CE,  required: 'O', repeat: 0 },
    { name: 'medically_necessary_duplicate_procedure_reason', position: 48, length: 250, type: CWE, required: 'C', repeat: 1 },
    { name: 'result_handling',                                position: 49, length: 2,   type: IS,  required: 'O', repeat: 1 }
  ],

  // OBSERVATION/RESULT
  // The OBX segment is used to transmit a single observation or observation
  // fragment. It represents the smallest indivisible unit of a report. The
  // OBX segment can also contain encapsulated data, e.g., a CDA document or a
  // DICOM image.
  OBX = [
    { name: 'set_id',                            position: 1,  length: 4,     type: SI,     required: 'O', repeat: 1 },
    { name: 'value_type',                        position: 2,  length: 2,     type: ID,     required: 'C', repeat: 1 },
    { name: 'observation_id',                    position: 3,  length: 250,   type: CE,     required: 'R', repeat: 1 },
    { name: 'observation_sub_id',                position: 4,  length: 20,    type: ST,     required: 'C', repeat: 1 },
    // { name: 'observation_value',              position: 5,  length: 99999, type: VARIES, required: 'C', repeat: 0 },
    { name: 'observation_value',                 position: 5,  length: 99999, type: NM,     required: 'C', repeat: 0 },
    { name: 'units',                             position: 6,  length: 250,   type: CE,     required: 'O', repeat: 1 },
    { name: 'references_range',                  position: 7,  length: 60,    type: ST,     required: 'O', repeat: 1 },
    { name: 'abnormal_flags',                    position: 8,  length: 5,     type: IS,     required: 'O', repeat: 0 },
    { name: 'probability',                       position: 9,  length: 5,     type: NM,     required: 'O', repeat: 1 },
    { name: 'nature_of_abnormal_test',           position: 10, length: 2,     type: ID,     required: 'O', repeat: 0 },
    { name: 'observation_result_status',         position: 11, length: 1,     type: ID,     required: 'R', repeat: 1 },
    { name: 'effective_date_of_reference_range', position: 12, length: 26,    type: TS,     required: 'O', repeat: 1 },
    { name: 'user_defined_access_checks',        position: 13, length: 20,    type: ST,     required: 'O', repeat: 1 },
    { name: 'datetime_of_the_observation',       position: 14, length: 26,    type: TS,     required: 'O', repeat: 1 },
    { name: 'producers_id',                      position: 15, length: 250,   type: CE,     required: 'O', repeat: 1 },
    { name: 'responsible_observer',              position: 16, length: 250,   type: XCN,    required: 'O', repeat: 0 },
    { name: 'observation_method',                position: 17, length: 250,   type: CE,     required: 'O', repeat: 0 },
    { name: 'equipment_instance_id',             position: 18, length: 22,    type: EI,     required: 'O', repeat: 0 },
    { name: 'datetime_of_the_analysis',          position: 19, length: 26,    type: TS,     required: 'O', repeat: 1 }
  ],

  // NOTES AND COMMENTS
  // The NTE segment is defined here for inclusion in messages defined in
  // other chapters. It is commonly used for sending notes and comments.
  NTE = [
    { name: 'set_id',            position: 1, length: 4,     type: SI, required: 'O', repeat: 1 },
    { name: 'source_of_comment', position: 2, length: 8,     type: ID, required: 'O', repeat: 1 },
    { name: 'comment',           position: 3, length: 65536, type: FT, required: 'O', repeat: 0 },
    { name: 'comment_type',      position: 4, length: 250,   type: CE, required: 'O', repeat: 1 }
  ];

module.exports = {
  MSH: MSH,
  PID: PID,
  ORC: ORC,
  OBR: OBR,
  OBX: OBX,
  NTE: NTE
};