var dat = {
	"wc.create": {
		"numCols": 12/3,
		"url": "/wcms/masters/propertytype-categorytype/_create",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "PropertyTypeCategoryType",
		"groups": [
			{
				"label": "wc.create.propertyCategory.title",
				"name": "PropertyTypeCategoryType",
				"fields": [
					{
						"name": "propertyType",
						"jsonPath": "PropertyTypeCategoryType.propertyTypeName",
						"label": "wc.create.propertyType",
						"pattern": "",
						"type": "singleValueList",
						"url": "/pt-property/property/propertytypes/_search?|$..name|$..name",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "categoryType",
						"jsonPath": "PropertyTypeCategoryType.categoryTypeName",
						"label": "wc.create.categoryType",
						"pattern": "",
						"type": "singleValueList",
						"url": "/wcms/masters/categorytype/_search?|$..name|$..name",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
						{
							"name": "Active",
							"jsonPath": "PropertyTypeCategoryType.active",
							"label": "Active",
							"pattern": "",
							"type": "checkbox",
							"isRequired": false,
							"isDisabled": false,
							"default": true,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						}
				]
			}
		]
	},
	"wc.search": {
		"numCols": 12/3,
		"url": "/wcms/masters/propertytype-categorytype/_search",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "PropertyTypeCategoryType",
		"groups": [
			{
				"label": "wc.search.PropertyTypeCategoryType.title",
				"name": "searchPropertyTypeCategoryType",
				"fields": [
					{
						"name": "propertyType",
						"jsonPath": "propertyTypeName",
						"label": "wc.create.propertyType",
						"pattern": "",
						"type": "singleValueList",
						"url": "/pt-property/property/propertytypes/_search?|$..name|$..name",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "categoryType",
						"jsonPath": "categoryTypeName",
						"label": "wc.create.categoryType",
						"pattern": "",
						"type": "singleValueList",
						"url": "/wcms/masters/categorytype/_search?|$..name|$..name",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
						{
							"name": "Active",
							"jsonPath": "active",
							"label": "Active",
							"pattern": "",
							"type": "checkbox",
							"isRequired": false,
							"isDisabled": false,
							"default": true,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						}
				]
			}
		],
		"result": {
			"header": [{label: "wc.create.propertyType"},{label: "wc.create.categoryType"}, {label: "wc.create.active"}],
			"values": ["propertyTypeName","categoryTypeName", "active"],
			"resultPath": "PropertyTypeCategoryTypes",
			"rowClickUrlUpdate": "/update/wc/propertyCategory/{id}",
			"rowClickUrlView": "/view/wc/propertyCategory/{id}"
			}
	},
	"wc.view": {
		"numCols": 12/3,
		"url": "/wcms/masters/propertytype-categorytype/_search?id={id}",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "PropertyTypeCategoryTypes",
		"groups": [
			{
				"label": "wc.view.PropertyTypeCategoryTypes.title",
				"name": "viewPropertyTypeCategoryTypes",
				"fields": [
						{
							"name": "propertyType",
							"jsonPath": "PropertyTypeCategoryTypes[0].propertyTypeName",
							"label": "wc.create.propertyType",
							"pattern": "",
							"type": "text",
							"isRequired": true,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						},
						{
							"name": "categoryTypeName",
							"jsonPath": "PropertyTypeCategoryTypes[0].categoryTypeName",
							"label": "wc.create.categoryType",
							"pattern": "",
							"type": "text",
							"isRequired": false,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						},
						{
							"name": "Active",
							"jsonPath": "PropertyTypeCategoryTypes[0].active",
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
		"searchUrl": "/wcms/masters/propertytype-categorytype/_search?id={id}",
		"url":"/wcms/masters/propertytype-categorytype/{PropertyTypeCategoryType.id}/_update",
		"tenantIdRequired": true,
		"isResponseArray":true,
		"useTimestamp": true,
		"objectName": "PropertyTypeCategoryType",
		"groups": [
			{
				"label": "wc.update.PropertyTypeCategoryType.title",
				"name": "updatePropertyTypeCategoryType",
				"fields": [
					{
						"name": "propertyType",
						"jsonPath": "PropertyTypeCategoryType.propertyTypeName",
						"label": "wc.create.propertyType",
						"pattern": "",
						"type": "singleValueList",
						"url": "/pt-property/property/propertytypes/_search?|$..name|$..name",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "categoryType",
						"jsonPath": "PropertyTypeCategoryType.categoryTypeName",
						"label": "wc.create.categoryType",
						"pattern": "",
						"type": "singleValueList",
						"url": "/wcms/masters/categorytype/_search?|$..name|$..name",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
						{
							"name": "Active",
							"jsonPath": "PropertyTypeCategoryType.active",
							"label": "Active",
							"pattern": "",
							"type": "checkbox",
							"isRequired": false,
							"isDisabled": false,
							"default": true,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						}
				]
			}
		]
	}
}

export default dat;
