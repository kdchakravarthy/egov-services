var dat = {
	"wc.create": {
		"numCols": 12/3,
		"url":  "/wcms/masters/usagetypes/_create",
		"tenantIdRequired": true,
		"idJsonPath": "UsageTypes[0].parent",
		"queryString":"?isSubUsageType=true",
		"useTimestamp": true,
		"objectName": "UsageTypes",
		"groups": [
			{
				"label": "wc.create.subUsageType.title",
				"name": "CreateUsageType",
				"fields": [
            {
              "name": "UsageType",
              "jsonPath": "UsageTypes[0].parent",
              "label": "wc.create.groups.connectionDetails.usageType",
              "pattern": "",
              "type": "singleValueList",
              "url": "/wcms/masters/usagetypes/_search?|$..id|$..name",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
							"name": "Name",
							"jsonPath": "UsageTypes[0].name",
							"label": "wc.create.groups.connectionDetails.subUsageType",
							"pattern": "^[\s.]*([^\s.][\s.]*){0,100}$",
							"type": "text",
							"isRequired": true,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": "Length should not more than 100"
						},
						{
							"name": "Description",
							"jsonPath": "UsageTypes[0].description",
							"label": "wc.create.description",
							"pattern": "^[\s.]*([^\s.][\s.]*){0,250}$",
							"type": "text",
							"isRequired": false,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": "Length should not more than 250"
						},
						{
							"name": "Active",
							"jsonPath": "UsageTypes[0].active",
							"label": "wc.create.active",
							"pattern": "",
							"type": "checkbox",
							"isRequired": false,
							"defaultValue":true,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						}
				]
			}
		]
	},
	"wc.search": {
		"numCols": 12/3,
		"url": "/wcms/masters/usagetypes/_search",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "UsageTypes",
		"groups": [
			{
				"label": "wc.search.subUsageType.title",
				"name": "CreateUsageType",
				"fields": [
					{
						"name": "UsageType",
						"jsonPath": "parent",
						"label": "wc.create.groups.connectionDetails.usageType",
						"pattern": "",
						"type": "singleValueList",
						"url": "/wcms/masters/usagetypes/_search?|$..id|$..name",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": "",
						"depedants": [{
                "jsonPath": "name",
                "type": "dropDown",
                "pattern": "/wcms/masters/usagetypes/_search?&isSubUsageType=true&parent={parent}|$..name|$..name"
              }]
					},
            {
              "name": "SubUsageType",
              "jsonPath": "name",
              "label": "wc.create.groups.connectionDetails.subUsageType",
              "pattern": "",
              "type": "singleValueList",
              "isRequired": false,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
							"name": "Active",
							"jsonPath": "active",
							"label": "wc.create.active",
							"pattern": "",
							"type": "checkbox",
							"isRequired": false,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						},
						{
							"name": "Valued",
							"jsonPath": "isSubUsageType",
							"label": "wc.create.active",
							"pattern": "",
							"type": "checkbox",
							"isRequired": false,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": "",
							"defaultValue":true,
							"isHidden":true
						}
				]
			}
		],
		"result": {
			"header": [{label: "wc.create.groups.connectionDetails.usageType"},{label: "wc.create.groups.connectionDetails.subUsageType"}, {label: "wc.search.result.description"}, {label: "wc.search.result.active"}],
			"values": ["parentName","name", "description", "active"],
			"resultPath": "UsageTypes",
			"rowClickUrlUpdate": "/update/wc/subUsageType/{id}?parent={parent}&isSubUsageType=true",
			"rowClickUrlView": "/view/wc/subUsageType/{id}?parent={parent}&isSubUsageType=true"
			}
	},
	"wc.view": {
		"numCols": 12/3,
		"url": "/wcms/masters/usagetypes/_search?parent={parent}&isSubUsageType=true",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "UsageTypes",
		"groups": [
			{
				"label": "wc.view.subUsageType.title",
				"name": "UsageTypes",
				"fields": [
            {
              "name": "UsageType",
              "jsonPath": "UsageTypes[0].parent",
              "label": "wc.create.groups.connectionDetails.usageType",
              "pattern": "",
              "type": "singleValueList",
              "url": "/wcms/masters/usagetypes/_search?|$..id|$..name",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
							"name": "name",
							"jsonPath": "UsageTypes[0].name",
							"label": "wc.create.groups.connectionDetails.subUsageType",
							"pattern": "",
							"type": "text",
							"isRequired": true,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						},
						{
							"name": "description",
							"jsonPath": "UsageTypes[0].description",
							"label": "wc.create.description",
							"pattern": "",
							"type": "text",
							"isRequired": false,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						},
						{
							"name": "Active",
							"jsonPath": "UsageTypes[0].active",
							"label": "wc.create.active",
							"pattern": "",
							"type": "checkbox",
							"isRequired": false,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						}
				]
			}
		]
	},
	"wc.update": {
		"numCols": 12/3,
		"searchUrl": "/wcms/masters/usagetypes/_search?parent={parent}&isSubUsageType=true",
		"url":"/wcms/masters/usagetypes/_update",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "UsageTypes",
		"groups": [
			{
				"label": "wc.update.subUsageType.title",
				"name": "UsageTypes",
				"fields": [
						{
							"name": "UsageType",
							"jsonPath": "UsageTypes[0].parent",
							"label": "wc.create.groups.connectionDetails.usageType",
							"pattern": "",
							"type": "singleValueList",
							"url": "/wcms/masters/usagetypes/_search?|$..id|$..name",
							"isRequired": true,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": "",
							"convertToString":true
						},
						{
							"name": "name",
							"jsonPath": "UsageTypes[0].name",
							"label": "wc.create.groups.connectionDetails.subUsageType",
							"pattern": "^[\s.]*([^\s.][\s.]*){0,100}$",
							"type": "text",
							"isRequired": true,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": "Length should not more than 100"
						},
						{
							"name": "description",
							"jsonPath": "UsageTypes[0].description",
							"label": "wc.create.description",
							"pattern": "^[\s.]*([^\s.][\s.]*){0,250}$",
							"type": "text",
							"isRequired": false,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": "Length should not more than 250"
						},
						{
							"name": "Active",
							"jsonPath": "UsageTypes[0].active",
							"label": "wc.create.active",
							"pattern": "",
							"type": "checkbox",
							"isRequired": false,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						}
				]
			}
		]
	}
}

export default dat;
