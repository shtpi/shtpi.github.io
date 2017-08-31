define({ "api": [
  {
    "type": "get",
    "url": "/event:data",
    "title": "Event data table page",
    "name": "GetEventDataTable",
    "group": "Event",
    "description": "<p>이 함수는 <code>pug</code>엔진에 의해 <code>json</code>타입으로 <code>bodyParser</code>로 전달하며 렌더링된 페이지로 출력 된다.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":cam",
            "description": "<p>Camera's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":year",
            "description": "<p>Year of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":month",
            "description": "<p>Month of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":day",
            "description": "<p>Day of event.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "HTML",
            "optional": false,
            "field": "/",
            "description": "<p>Rendered page.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>년월일 카메라 타이틀</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cam",
            "description": "<p>카메라 ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "year",
            "description": "<p>조회할 년도</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": "<p>조회할 월</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "day",
            "description": "<p>조회할 일자</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>이벤트 개수</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "listall",
            "description": "<p>이벤트 리스트 출력</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./router/index.js",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/list:cam",
    "title": "Event list for fullcallendar",
    "name": "GetListCam",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":cam",
            "description": "<p>Camera's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>감지된 낙석 개수</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "allDay",
            "description": "<p>전일 데이터</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start",
            "description": "<p>조회할 날짜</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>일간 이벤트 기록 url 주소</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "icon",
            "description": "<p>아이콘 파라미터</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        title: 1,\n        allDay: true,\n        start: \"2017-01-11\",\n        url: \"/event:1:2017:01:11\",\n        icon: \"fa fa-bell\"\n    },\n    {\n        title: 135,\n        allDay: true,\n        start: \"2017-01-20\",\n        url: \"/event:1:2017:01:20\",\n        icon: \"fa fa-bell\"\n    },...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ListCam",
            "description": "<p>NotFound The id of the <code>cam</code> was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not exist cam id\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./router/index.js",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/media:data",
    "title": "Media data page",
    "name": "GetMediaData",
    "group": "Event",
    "description": "<p>이 함수는 <code>pug</code>엔진에 의해 <code>json</code>타입으로 <code>bodyParser</code>로 전달하며 렌더링된 페이지로 출력 된다.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":cam",
            "description": "<p>Camera's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":year",
            "description": "<p>Year of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":month",
            "description": "<p>Month of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":day",
            "description": "<p>Day of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":hour",
            "description": "<p>Hour of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":minute",
            "description": "<p>Minute of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":second",
            "description": "<p>Second of event.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "HTML",
            "optional": false,
            "field": "/",
            "description": "<p>Rendered page.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>년월일 카메라 타이틀</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "original",
            "description": "<p>원본이미지 url</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "marked",
            "description": "<p>낙석 표시된 이미지 url</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "video",
            "description": "<p>이벤트 녹화된 동영상 url</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "params",
            "description": "<p>파라미터.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./router/index.js",
    "groupTitle": "Event"
  },
  {
    "type": "post",
    "url": "/delmedia:data",
    "title": "Delete event",
    "name": "PostDeleteMedia",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":data",
            "description": "<p>unique ID of DB.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./router/index.js",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/jpg/:data",
    "title": "Get marked image",
    "name": "GetJPG",
    "group": "Media",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":cam",
            "description": "<p>Camera's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":year",
            "description": "<p>Year of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":month",
            "description": "<p>Month of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":day",
            "description": "<p>Day of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":hour",
            "description": "<p>Hour of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":minute",
            "description": "<p>Minute of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":second",
            "description": "<p>Second of event.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "base64",
            "optional": false,
            "field": "/",
            "description": "<p>Binary image</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./router/index.js",
    "groupTitle": "Media"
  },
  {
    "type": "get",
    "url": "/mp4/:data",
    "title": "Get recorded MP4 video",
    "name": "GetMP4",
    "group": "Media",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":cam",
            "description": "<p>Camera's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":year",
            "description": "<p>Year of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":month",
            "description": "<p>Month of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":day",
            "description": "<p>Day of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":hour",
            "description": "<p>Hour of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":minute",
            "description": "<p>Minute of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":second",
            "description": "<p>Second of event.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "base64",
            "optional": false,
            "field": "/",
            "description": "<p>Binary video</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./router/index.js",
    "groupTitle": "Media"
  },
  {
    "type": "get",
    "url": "/png/:data",
    "title": "Get original image",
    "name": "GetPNG",
    "group": "Media",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":cam",
            "description": "<p>Camera's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":year",
            "description": "<p>Year of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":month",
            "description": "<p>Month of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":day",
            "description": "<p>Day of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":hour",
            "description": "<p>Hour of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":minute",
            "description": "<p>Minute of event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":second",
            "description": "<p>Second of event.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "base64",
            "optional": false,
            "field": "/",
            "description": "<p>Binary image</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./router/index.js",
    "groupTitle": "Media"
  },
  {
    "type": "get",
    "url": "/smsaddress",
    "title": "SMS address",
    "name": "GetListSMSAddr",
    "group": "SMS",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "SMS",
            "description": "<p>Phone address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n \"01044996420\",\n \"01029886664\",\n \"01022672804\",...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./router/index.js",
    "groupTitle": "SMS"
  },
  {
    "type": "post",
    "url": "/phone",
    "title": "SMS Address post",
    "name": "PostSMSAddress",
    "group": "SMS",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":data",
            "description": "<p>Phone number (except '-').</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./router/ajax.js",
    "groupTitle": "SMS"
  }
] });
