// 自定义一个后端上传配置项,下面要用
class EndUploadConfig {
  constructor () {
    this.init()
  }
  init () {
    // 默认配置来源百度富文本
    let tempObj = {
      "imageActionName": "uploadimage",
      "imageFieldName": "file",
      "imageMaxSize": 2048000,
      "imageAllowFiles": [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".bmp"
      ],
      "imageCompressEnable": true,
      "imageCompressBorder": 1600,
      "imageInsertAlign": "none",
      "imageUrlPrefix": "http://35.201.165.105:8000",
      "imagePathFormat": "/storage/image/{yyyy}{mm}{dd}/{time}{rand:6}",
      "scrawlActionName": "uploadscrawl",
      "scrawlFieldName": "file",
      "scrawlPathFormat": "/storage/image/{yyyy}{mm}{dd}/{time}{rand:6}",
      "scrawlMaxSize": 2048000,
      "scrawlUrlPrefix": "http://35.201.165.105:8000",
      "scrawlInsertAlign": "none",
      "snapscreenActionName": "uploadimage",
      "snapscreenPathFormat": "/storage/image/{yyyy}{mm}{dd}/{time}{rand:6}",
      "snapscreenUrlPrefix": "http://35.201.165.105:8000",
      "snapscreenInsertAlign": "none",
      "catcherLocalDomain": [
        "127.0.0.1",
        "localhost",
        "img.baidu.com"
      ],
      "catcherActionName": "catchimage",
      "catcherFieldName": "source",
      "catcherPathFormat": "/storage/image/{yyyy}{mm}{dd}/{time}{rand:6}",
      "catcherUrlPrefix": "http://35.201.165.105:8000",
      "catcherMaxSize": 2048000,
      "catcherAllowFiles": [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".bmp"
      ],
      "videoActionName": "uploadvideo",
      "videoFieldName": "file",
      "videoPathFormat": "/storage/video/{yyyy}{mm}{dd}/{time}{rand:6}",
      "videoUrlPrefix": "http://35.201.165.105:8000",
      "videoMaxSize": 102400000,
      "videoAllowFiles": [
        ".flv",
        ".swf",
        ".mkv",
        ".avi",
        ".rm",
        ".rmvb",
        ".mpeg",
        ".mpg",
        ".ogg",
        ".ogv",
        ".mov",
        ".wmv",
        ".mp4",
        ".webm",
        ".mp3",
        ".wav",
        ".mid"
      ],
      "fileActionName": "uploadfile",
      "fileFieldName": "file",
      "filePathFormat": "/storage/file/{yyyy}{mm}{dd}/{time}{rand:6}",
      "fileUrlPrefix": "http://35.201.165.105:8000",
      "fileMaxSize": 51200000,
      "fileAllowFiles": [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".bmp",
        ".flv",
        ".swf",
        ".mkv",
        ".avi",
        ".rm",
        ".rmvb",
        ".mpeg",
        ".mpg",
        ".ogg",
        ".ogv",
        ".mov",
        ".wmv",
        ".mp4",
        ".webm",
        ".mp3",
        ".wav",
        ".mid",
        ".rar",
        ".zip",
        ".tar",
        ".gz",
        ".7z",
        ".bz2",
        ".cab",
        ".iso",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        ".pdf",
        ".txt",
        ".md",
        ".xml"
      ],
      "imageManagerActionName": "listimage",
      "imageManagerListPath": "/storage/image/",
      "imageManagerListSize": 20,
      "imageManagerUrlPrefix": "http://35.201.165.105:8000",
      "imageManagerInsertAlign": "none",
      "imageManagerAllowFiles": [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".bmp"
      ],
      "fileManagerActionName": "listfile",
      "fileManagerListPath": "/storage/file/",
      "fileManagerUrlPrefix": "http://35.201.165.105:8000",
      "fileManagerListSize": 20,
      "fileManagerAllowFiles": [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".bmp",
        ".flv",
        ".swf",
        ".mkv",
        ".avi",
        ".rm",
        ".rmvb",
        ".mpeg",
        ".mpg",
        ".ogg",
            ".ogv",
            
            
        ".mov",
        ".wmv",
        ".mp4",
        ".webm",
        ".mp3",
        ".wav",
        ".mid",
        ".rar",
        ".zip",
        ".tar",
        ".gz",
        ".7z",
        ".bz2",
        ".cab",
        ".iso",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        ".pdf",
        ".txt",
        ".md",
        ".xml"
      ]
    }
    Object.assign(this, tempObj)
  }
  changeServerUrl (url) {
    this.imageUrlPrefix = url
    this.scrawlUrlPrefix = url
    this.snapscreenUrlPrefix = url
    this.catcherUrlPrefix = url
    this.videoUrlPrefix = url
    this.fileUrlPrefix = url
    this.imageManagerUrlPrefix = url
    this.fileManagerUrlPrefix = url
  }
}
let endUploadConfig = new EndUploadConfig()