var dat = {
  "legal.search": {
    numCols: 4,
    title: "summon.search.document.title",
    useTimestamp: true,
    objectName: "cases",
    url: "/lcms-services/legalcase/case/_search",
    groups: [
      {
        name: "search",
        label: "legal.search.case.title",
        fields: [
           {
            name: "fromDate",
            jsonPath: "fromDate",
            label: "legal.create.caseregistration.fromDate",
            type: "datePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legal.create.field.message.fromDate"
          },
          {
            name: "toDate",
            jsonPath: "toDate",
            label:  "legal.create.caseregistration.toDate",
            type: "datePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legal.create.field.message.toDate"
          },{
            name: "referenceNo",
            jsonPath: "summonReferenceNo",
            label: "legal.create.referenceNo",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legal.create.field.message.referenceNo"
          },
          {
            name: "referenceCaseNo",
            jsonPath: "caseReferenceNo",
            label: "caseRegistration.create.referenceCaseNo",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legal.create.field.message.referenceCaseNo"
          },{
            name: "caseNo",
            jsonPath: "caseNo",
            label: "caseRegistration.create.caseNo",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "legal.create.field.message.referenceCaseNo"
          },
          {
            name: "caseStatus",
            jsonPath: "caseStatus",
            label: "advocatepayment.create.caseStatus",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=caseStatus|$..code|$..name"
          },
          {
            name: "caseType",
            jsonPath: "caseType",
            label: "legal.create.caseType",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=caseType|$..code|$..name"
          },
          {
            name: "departmentName",
            jsonPath: "departmentName",
            label: "legal.create.departmentName",
            type: "singleValueList",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: "",
            url: "/egov-common-masters/departments/_search?|$..code|$..name"
          },
          {
            name: "advocateName",
            type: "singleValueList",
            label: "legal.create.advocateName",
             isKeyOtherPair:"agencyName",
            jsonPath: "advocateName",
            isRequired: false,
            isDisabled: false,
            url:
              "/lcms-services/legalcase/advocate/_search?|$..code|$..name"
          }
        ]
      }
    ],
    result: {
      "disableRowClick" : true,
       isAction: true,
          actionItems: [
            {
              label: "Assign ADV",
              url: "/update/legal/assignadvocate/"
            },
            {
              label: "Case Reg",
              url: "/update/legal/caseregistration/"
            }, {
              label: "Vakalat",
              url: "/update/legal/vakalatnama/"
            }, {
              label: "Hearing",
              url: "/update/legal/hearingdetails/"
            }, {
              label: "ParaWise",
              url: "/update/legal/parawisecomments/"
            },{
              label: "Ref Evidence",
              url:"/update/legal/referenceevidence/"
            },
            // {
            //   label: "Update",
            //   url:"/update/legal/casedetails/"
            // },
            // {
            //   label: "View",
            //   url:"/view/legal/casedetails/"
            // }
          ],
      header: [
        {
          label: "legal.search.result.actionLabels",
          isChecked:true,
          checkedItem:{
            jsonPath:"checkedRow",
            label:"",
          }
        },
        {
          label: "legal.create.referenceNo",
          isAction:true,
          actionItems:[{
            label: "View",
            url:"/view/legal/casedetails/"
          }]
        },
        {
          label: "caseRegistration.create.referenceCaseNo"
        },
        {
          label: "advocatepayment.create.caseStatus"
        }, {
          label: "legal.create.caseNo"
        },
        {
          label: "legal.create.departmentName"
        },
        {
          label: "legal.create.caseType"
        },
        {
          label: "legal.create.advocateName"
        }
      ],
      values: [
         "code",
          {
          childArray:["summon.summonReferenceNo","code"],
          isObj:true
         },
        "caseRefernceNo",
        "caseStatus.name",
        "summon.caseNo",
        "summon.departmentName.name",
        "summon.caseType.name",
        "advocateDetails[0].advocate.name"
      ],
      resultPath: "cases",
      rowClickUrlUpdate: "/update/legalcase/case/{id}",
      rowClickUrlView: "/view/legalcase/case/{id}"
    }
  },
  "legal.create": {
    numCols: 4,
    title: "summon.create.document.title",
    useTimestamp: true,
    objectName: "summons",
    groups: [
      {
        name: "CaseType",
        label: "legal.create.group.title.CaseType",
        fields: [
          {
            name: "isSummon",
            jsonPath: "summons[0].isSummon",
            label: "legal.create.isSummon",
            type: "radio",
            styleObj:{"display": "-webkit-box"},
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            values: [
              {
                label: "legal.create.Summon",
                value: true
              },
              {
                label: "legal.create.Warrant",
                value: false
              }
            ]
          }
        ]
      },
      {
        name: "CaseTypeDetails",
        label: "legal.create.group.title.CaseTypeDetails",
        fields: [
          {
            name: "orignatedBYULB",
            jsonPath: "summons[0].orignatedBYULB",
            label: "legal.create.orignatedBYULB",
            type: "checkbox",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "referenceNo",
            jsonPath: "summons[0].summonReferenceNo",
            label: "legal.create.referenceNo",
            type: "text",
            isRequired: false,
            isDisabled: true,
            patternErrorMsg: ""
          }, {
            name: "year",
            jsonPath: "summons[0].year",
            label: "legal.create.year",
            type: "singleValueList",
            isCurrentYear:true,
            isRequired: true,
            isDisabled: false,
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=year|$..code|$..name",
            patternErrorMsg: ""
          },
          {
            name: "summonDate",
            jsonPath: "summons[0].summonDate",
            label: "legal.create.summonDate",
            type: "datePicker",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "side",
            jsonPath: "summons[0].side.code",
            label: "legal.create.side",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=side|$..code|$..name",
            depedants: [
              {
                jsonPath: "summons[0].caseType.code",
                type: "dropDown",
                 "pattern":"/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=caseType&filter=%5B%3F%28%40.sideCode%3D%3D'{summons[0].side.code}'%29%5D|$..code|$..name"
              }
            ]
          },
          {
            name: "caseType",
            jsonPath: "summons[0].caseType.code",
            label: "legal.create.caseType",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url: ""
            // "url": "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=caseType|$..code|$..name"
          },
          {
            name: "caseCategory",
            jsonPath: "summons[0].caseCategory.code",
            label: "legal.create.caseCategory",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=caseCategory|$..code|$..name"
          },
          {
            name: "caseNo",
            jsonPath: "summons[0].caseNo",
            label: "legal.create.caseNo",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "plantiffName",
            jsonPath: "summons[0].plantiffName",
            label: "legal.create.plantiffName",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "plantiffAddress",
            jsonPath: "summons[0].plantiffAddress.addressLine1",
            label: "legal.create.plantiffAddress",
            type: "textarea",
            fullWidth: true,
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "caseDetails",
            jsonPath: "summons[0].caseDetails",
            label: "legal.create.caseDetails",
            type: "textarea",
            fullWidth: true,
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "defendant",
            jsonPath: "summons[0].defendant",
            label: "legal.create.defendant",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "departmentName",
            jsonPath: "summons[0].departmentName.code",
            label: "legal.create.departmentName",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url: "/egov-common-masters/departments/_search?|$..code|$..name"
          },
          {
            name: "hearingDate",
            jsonPath: "summons[0].hearingDate",
            label: "legal.create.hearingDate",
            type: "datePicker",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          // {
          //   name: "hearingTime",
          //   jsonPath: "summons[0].hearingTime",
          //   label: "legal.create.hearingTime",
          //   type: "text",
          //   isNumber: true,
          //   isRequired: false,
          //   isDisabled: false,
          //   patternErrorMsg: ""
          // }, 
          {
            name: "hearingTime",
            jsonPath: "summons[0].hearingTime",
            label: "legal.create.hearingTime",
            type: "timePicker",
            isNumber: true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "courtName",
            jsonPath: "summons[0].courtName.code",
            label: "legal.create.courtName",
            type: "singleValueList",
            isKeyOtherPair:"type",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=court|$..code|$..name"
          },
         {
            name: "ward",
            jsonPath: "summons[0].ward",
            label: "legal.create.ward",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:"/egov-location/boundarys/getByBoundaryType?tenantId=default&boundaryTypeId=10|$.Boundary.*.id|$.Boundary.*.name"
          },
          {
            name: "bench",
            jsonPath: "summons[0].bench.code",
            label: "legal.create.bench",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=bench|$..code|$..name"
          },
          {
            name: "stamp",
            jsonPath: "summons[0].register.code",
            label: "legal.create.stamp",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url: "lcms-services/legalcase/register/_search?|$..code|$..register"
          },
          {
            name: "sectionApplied",
            jsonPath: "summons[0].sectionApplied",
            label: "legal.create.sectionApplied",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          }
        ]
      },
      {
        name: "UploadDocument",
        label: "legal.create.group.title.UploadDocument",
        fields: [
          {
            name: "UploadDocument",
            jsonPath: "summons[0].documents",
            label: "legal.create.sectionApplied",
            type: "fileTable",
            isRequired: false,
            isDisabled: false,
            patternErrMsg: "",
            fileList: {
              name: "documentName",
              id: "fileStoreId"
            },
            fileCount: 3
          }
        ]
      }
    ],
    url: "/lcms-services/legalcase/summon/_create",
    tenantIdRequired: true
  },
  "legal.view": {
    numCols: 4,
    useTimestamp: true,
    objectName: "summons",
    groups: [
      {
        name: "CaseType",
        label: "legal.create.group.title.CaseType",
        fields: [
          {
            name: "isSummon",
            jsonPath: "summons[0].isSummon",
            label: "legal.create.isSummon",
            type: "radio",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            values: [
              {
                label: "legal.create.Summon",
                value: true
              },
              {
                label: "legal.create.Warrant",
                value: false
              }
            ]
          }
        ]
      },
      {
        name: "CaseTypeDetails",
        label: "legal.create.group.title.CaseTypeDetails",
        fields: [
          {
            name: "referenceNo",
            jsonPath: "summons[0].referenceNo",
            label: "legal.create.referenceNo",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "summonDate",
            jsonPath: "summons[0].summonDate",
            label: "legal.create.summonDate",
            type: "number",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "year",
            jsonPath: "summons[0].year",
            label: "legal.create.year",
            type: "text",
            isRequired: true,
            isDisabled: false,
            maxLength: 4,
            patternErrorMsg: ""
          },
          {
            name: "caseType",
            jsonPath: "summons[0].caseType.name",
            label: "legal.create.caseType",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=caseType|$..code|$..name"
          },
          {
            name: "plantiffName",
            jsonPath: "summons[0].plantiffName",
            label: "legal.create.plantiffName",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "caseNo",
            jsonPath: "summons[0].caseNo",
            label: "legal.create.caseNo",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "plantiffAddress",
            jsonPath: "summons[0].plantiffAddress",
            label: "legal.create.plantiffAddress",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "caseDetails",
            jsonPath: "summons[0].caseDetails",
            label: "legal.create.caseDetails",
            type: "textarea",
            fullWidth: true,
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "defendant",
            jsonPath: "summons[0].defendant",
            label: "legal.create.defendant",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "departmentName",
            jsonPath: "summons[0].departmentName.code",
            label: "legal.create.departmentName",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url: "/egov-common-masters/departments/_search?|$..code|$..name"
          },
          {
            name: "courtName",
            jsonPath: "summons[0].courtName",
            label: "legal.create.courtName",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=court|$..code|$..name"
          },
          {
            name: "hearingDate",
            jsonPath: "summons[0].hearingDate",
            label: "legal.create.hearingDate",
            type: "number",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "ward",
            jsonPath: "summons[0].ward",
            label: "legal.create.ward",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:"/egov-location/boundarys/getByBoundaryType?tenantId=default&boundaryTypeId=10|$.Boundary.*.id|$.Boundary.*.name"
          },
          {
            name: "hearingTime",
            jsonPath: "summons[0].hearingTime",
            label: "legal.create.hearingTime",
            type: "timePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "bench",
            jsonPath: "summons[0].bench.code",
            label: "legal.create.bench",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=bench|$..code|$..name"
          },
          {
            name: "side",
            jsonPath: "summons[0].side.code",
            label: "legal.create.side",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=side|$..code|$..name"
          },
          {
            name: "stamp",
            jsonPath: "summons[0].stamp.code",
            label: "legal.create.stamp",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=stamp|$..code|$..name"
          },
          {
            name: "sectionApplied",
            jsonPath: "summons[0].sectionApplied",
            label: "legal.create.sectionApplied",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          }
        ]
      }
    ],
    tenantIdRequired: true
  },
  "legal.update": {
    numCols: 4,
    title: "summon.update.document.title",
    useTimestamp: true,
    objectName: "summons",
    searchUrl: "legalcase/_search?id={id}",
    groups: [
      {
        name: "CaseType",
        label: "legal.create.group.title.CaseType",
        fields: [
          {
            name: "isSummon",
            jsonPath: "summons[0].isSummon",
            label: "legal.create.isSummon",
            type: "radio",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            values: [
              {
                label: "legal.create.Summon",
                value: true
              },
              {
                label: "legal.create.Warrant",
                value: false
              }
            ]
          }
        ]
      },
      {
        name: "CaseTypeDetails",
        label: "legal.create.group.title.CaseTypeDetails",
        fields: [
          {
            name: "referenceNo",
            jsonPath: "summons[0].referenceNo",
            label: "legal.create.referenceNo",
            type: "text",
            isRequired: false,
            isDisabled: true,
            patternErrorMsg: ""
          },
          {
            name: "summonDate",
            jsonPath: "summons[0].summonDate",
            label: "legal.create.summonDate",
            type: "number",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "year",
            jsonPath: "summons[0].year",
            label: "legal.create.year",
            type: "text",
            isRequired: true,
            isDisabled: false,
            maxLength: 4,
            patternErrorMsg: ""
          },
          {
            name: "caseType",
            jsonPath: "summons[0].caseType",
            label: "legal.create.caseType",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=caseType|$..code|$..name"
          },
          {
            name: "plantiffName",
            jsonPath: "summons[0].plantiffName",
            label: "legal.create.plantiffName",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "caseNo",
            jsonPath: "summons[0].caseNo",
            label: "legal.create.caseNo",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "plantiffAddress",
            jsonPath: "summons[0].plantiffAddress",
            label: "legal.create.plantiffAddress",
            type: "text",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "caseDetails",
            jsonPath: "summons[0].caseDetails",
            label: "legal.create.caseDetails",
            type: "textarea",
            fullWidth: true,
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "defendant",
            jsonPath: "summons[0].defendant",
            label: "legal.create.defendant",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "departmentName",
            jsonPath: "summons[0].departmentName",
            label: "legal.create.departmentName",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url: "/egov-common-masters/departments/_search?|$..code|$..name"
          },
          {
            name: "courtName",
            jsonPath: "summons[0].courtName",
            label: "legal.create.courtName",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=court|$..code|$..name"
          },
          {
            name: "hearingDate",
            jsonPath: "summons[0].hearingDate",
            label: "legal.create.hearingDate",
            type: "number",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "ward",
            jsonPath: "summons[0].ward",
            label: "legal.create.ward",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:"/egov-location/boundarys/getByBoundaryType?tenantId=default&boundaryTypeId=10|$.Boundary.*.id|$.Boundary.*.name"
          },
          {
            name: "hearingTime",
            jsonPath: "summons[0].hearingTime",
            label: "legal.create.hearingTime",
            type: "timePicker",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          },
          {
            name: "bench",
            jsonPath: "summons[0].bench",
            label: "legal.create.bench",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=bench|$..code|$..name"
          },
          {
            name: "side",
            jsonPath: "summons[0].side",
            label: "legal.create.side",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=side|$..code|$..name"
          },
          {
            name: "stamp",
            jsonPath: "summons[0].stamp",
            label: "legal.create.stamp",
            type: "singleValueList",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: "",
            url:
              "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=stamp|$..code|$..name"
          },
          {
            name: "sectionApplied",
            jsonPath: "summons[0].sectionApplied",
            label: "legal.create.sectionApplied",
            type: "text",
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ""
          }
        ]
      }
    ],
    url: "/legalcase/_update",
    tenantIdRequired: true
  }
};
export default dat;