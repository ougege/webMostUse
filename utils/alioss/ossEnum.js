/// <summary>
/// 文件类型
/// </summary>
export const FileType = {
        Logo: 0,
  // [Description("图片")]
        Picture : 1,
  // [Description("音乐或声音文件")]
        Music : 2,
  // [Description("视频")]
        Video : 3,
  // [Description("文档类文件，如doc、excel、ppt、txt等")]
        Document : 4,
  // [Description("其他")]
        Other : 999
}
/// <summary>
/// 按文件类别设定的业务功能代码
/// </summary>
export const BusiCodeOfFile = {
  // [Description("用户头像，一般是小图片")]
        UserLogo : 0,
  // [Description("用户图片库")]
        UserPics : 1,
  // [Description("用户声音音乐库")]
        UserMusics : 2,
  // [Description("用户视频库")]
        UserVideos : 3,
  // [Description("用户文档库")]
        UserDocs : 4,
  // 添加新业务功能文件代码时，注意预留50类通用类别文件定义，从基础值+50开始。通用类别的能与FileType类别代码对应上
  // [Description("用户其他文件库")]
        UserOthers : 999,

  // [Description("组织Logo")]
        OrgLogo : 1000,
  // [Description("组织图片库")]
        OrgPics : 1001,
  // [Description("组织声音音乐库")]
        OrgMusics : 1002,
  // [Description("组织视频库")]
        OrgVideos : 1003,
  // [Description("组织文档库")]
        OrgDocs : 1004,
  // 添加新业务功能文件代码时，注意预留50类通用类别文件定义，从基础值+50开始。通用类别的能与FileType类别代码对应上
  // [Description("组织营业执照")]
        OrgYingye : 1050,
  // [Description("组织机构代码")]
        OrgJigou : 1051,
  // [Description("组织其他文件库")]
        OrgOthers : 1999,


  // [Description("经营体Logo")]
        EntityLogo : 2000,
  // [Description("经营体图片库")]
        EntityPics : 2001,
  // [Description("经营体声音音乐库")]
        EntityMusics : 2002,
  // [Description("经营体视频库")]
        EntityVideos : 2003,
  // [Description("经营体文档库")]
        EntityDocs : 2004,
  // 添加新业务功能文件代码时，注意预留50类通用类别文件定义，从基础值+50开始。通用类别的能与FileType类别代码对应上
  // [Description("经营体其他文件库")]
        EntityOthers : 2999,

  // [Description("其他")]
        Other : 99999
}