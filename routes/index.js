var number=require('./data.js')._NUMBER;
var path=require('path');
var pics=require('./data.js')._PICS;
var pics_no=require('./data.js')._PICS_NO;
var express = require('express');
var fs = require('fs');
var process = require('child_process');
router = express.Router(),
    formidable = require('formidable'),
    fs = require('fs'),
    TITLE = '图片上传',
    AVATAR_UPLOAD_FOLDER = '/piclib/';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: TITLE });
});

router.post('/', function(req, res) {

  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {

    if (err) {
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }

    var extName = '';  //后缀名
    switch (files.fulAvatar.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
      case 'image/bmp':
        extName = 'bmp';
        break;
    }

    if(extName.length == 0){
      res.locals.error = '只支持png、jpg、bmp格式图片';
      res.render('index', { title: TITLE });
      return;
    }
    number++;
    var avatarName = Math.random() + '.' + extName;
    var newPath = form.uploadDir + number.toString()+'.'+extName;
    pics[number]=newPath;
    console.log(pics);
    pics_no[number]=number;
    fs.renameSync(files.fulAvatar.path, newPath);  //重命名
  });

  res.locals.success = '上传成功';
  res.render('index', { title: TITLE });
});

router.get('/result', function(req, res) {
  fs.open("input.txt","w+");
  var tmp_str=number.toString()+'\n';
   for(var i=1;i<=number;i++)
    tmp_str+=pics[i]+'\n';
  fs.writeFile("input.txt",tmp_str);
  var mat_process=process.exec('demo.exe');
  mat_process.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });

  var sort;

  mat_process.on('close', function(code) {
    var sort=new Array();
    fs.readFile(path.join('public','/sort.txt'), 'utf-8',function (err, data) {
      if (err) throw err;
      var sort_s=data.split(" ");
      for(var i=1;i<=number;i++) {
        sort[i] = parseInt(sort_s[i - 1]);
      }
      var param2 = {
        num: number,
        chart_info:sort
      };
      res.render('result',param2);
    });



  });
});
router.get('/charts', function(req, res) {
  res.sendFile(path.join(__dirname,'charts.js'));
});
router.get('*.tsv', function(req, res) {
  console.log(path.join('public','/tsv'+req['url']));
  res.sendfile(path.join('public','/tsv'+req['url']));
});
router.get('/img*', function(req, res) {
  var tno= parseInt(req['url'].substr(4));

  res.sendfile(path.join(pics[tno]));

});
module.exports = router;
