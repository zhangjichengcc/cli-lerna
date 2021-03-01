#!/usr/bin/env node

/*
 * @Author: zhangjicheng
 * @Date: 2021-02-03 17:10:02
 * @LastEditTime: 2021-02-20 19:02:20
 * @LastEditors: zhangjicheng
 * @Description: 
 * @可以输入预定的版权声明、个性签名、空行等
 */

var fs = require('fs');
var program = require('commander');
const chalk = require('chalk');
const ProgressBar = require('progress');
const Https = require('https');
const Http = require('http');
const iconv = require('iconv-lite');
const html2md=require('html-to-md');

/** 处理html字符串类 */
class HtmlStr {
  constructor(str) {
    this.str = str;
  }

  removeTags(tag) {
    const reg = new RegExp(`<${tag}[^<${tag}]*?<\\/${tag}>`, 'g');
    const fn = (_str) => {
      const res = _str.replace(reg, '');
      return reg.test(res) ? fn(res) : res;
    }
    this.str = fn(this.str);
    return this;
  }

  getTags(tag) {
    const reg = new RegExp(`(?<=<${tag}.*?>).*?(?=</${tag}>)`, 'g');
    return this.str.match(reg);
  }

  getStr() {
    return this.str;
  }
}

/** 写入html方法 文件流形式 */
function writeHtml(name, file) {
  const writerStream = fs.createWriteStream(`./${name}.html`);
  writerStream.write(JSON.stringify(file), 'UTF8');
  // 处理流事件 --> data, end, and error
  writerStream.on('finish', function () {
    console.log('<<<------------------------------- html写入完成 ------------------------------->>>\n');
  });
  writerStream.on('error', function (err) {
    console.log(err.stack);
  });
}

/** 写入md文件方法 */
function writeMd(name, file) {
  fs.writeFile(`./${name}.md`, file, (error) => {
    if (error) {
      console.log('写入失败')
    } else {
      console.log(file);
      console.log('<<<------------------------------- markdown写入完成 ------------------------------->>>\n');
    }
  })
}

/** html转md */
function htmlToMd(str) {
  console.log(str.length);
  console.time('md');
  /** 速度中值 */
  const v = 65/266142;
  const times = str.length * v;
  console.log(`\n${chalk.green(`开始转义html => markdown, 预计${times.toFixed(2)}s，请耐心等候。。。`)}`);

  return new Promise((resolve, reject) => {
    try {
      const md = html2md(str, {
        ignoreTags: ['script', 'style', 'header', 'meta'],
      });
      resolve(md);
    } catch {
      reject('error');
    }
  })
}

// 爬取和存入
function urlEnter(url) {
  console.log(`${chalk.green('开始拉取数据')}`);
  const http = url.includes('https') ? Https : Http;
  http.get(url, request => {
    const total = Number(request.headers['content-length']);
    let current = 0;
    const bar = new ProgressBar('rate of pull：[:bar] percent::percent length::current/:total', {
      complete: '#',
      incomplete: '-',
      width: 80, // 设置进度条长度
      total,
    }); 
    let html = ''; // 用来装得到的HTML
    request.on('data', chunk => {
      current += chunk.length;
      percent = (current/total * 100).toFixed(2);
      html += iconv.decode(chunk, 'utf-8');
      total && bar.tick(chunk.length);
    })
    .on('end', () => {
      const htmlStr = new HtmlStr(html);
      const htmlTitle = htmlStr.getTags('title')[0];
      const title = htmlTitle.replace(/[\s\.\|]/g, '') || 'markdown';
      // writeHtml(title, html);
      htmlToMd(html).then(res => {
        console.log(chalk.green(`转码完成。`));
        writeMd(title, res);
      }).catch(() => {
        console.log(chalk.red(`解析失败！`));
      });
    });
  });
}

function main(url) {
  console.log(chalk.green(`文章来源：${url}`))
  urlEnter(url);
}

program.version(require('../package.json').version, '-v, --version');


program.option('-u, --url <url>', 'artical url', main);
program.parse(process.argv);