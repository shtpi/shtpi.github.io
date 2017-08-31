define({
  "title": "CCTV-AOD-Web-Dashboard-API",
  "description": "CCTV-AOD (abondoned object detection) web application API document",
  "version": "0.1.0",
  "header": {
    "title": "Introduction",
    "content": "<h2>CCTV 낙석감지 통합 웹어플리케이션</h2>\n<ul>\n<li>본 웹 어플리케이션은 재해우려개소에 설치된 CCTV, LTE Router, Mini PC에서 감지된 이벤트를 전송하여 통합관리하기 위한 웹서버이다. 관리대상은 CCTV스트리밍 전송, 카메라 원격설정, LTE라우터의 네트워크 모니터링, LTE라우터 웹서버 링크, 낙석감지 이벤트 DB(원본스냅샷, 마크드스냅샷, 영상), 낙석감지 알고리즘 파라미터 설정 등.</li>\n<li>현재 버젼에는 LTE라우터 네트워크 모니터링, LTE라우터 웹서버 링크, 낙석감지 이벤트 DB(원본스냅샷, 마크드스냅샷, 영상)이 구동되고 있다.</li>\n<li>시스템은 현장PC에서 가동되는 어플리케이션과 관리서버에서 가동되는 웹어플리케이션으로 분리된다. 현장PC에서는 원격 관리서버로 수시로 데이터를 보내기위한 조건을 갖추어 지속적으로 데이터를 송신한다. 또한 개발될 버젼에서는 서버데이터를 수신하여 낙석감지 알고리즘의 파라미터를 수정하도록 한다. 원격 관리서버는 여러개소의 현장데이터를 관리하고 제어한다.</li>\n<li>웹 어플리케이션은 <a href=\"http://expressjs.com/ko/\">express</a>웹 프레임워크를 사용하고 <a href=\"https://pugjs.org/api/reference.html\">pugjs</a>를 템플릿 엔진으로 렌더링된다. 미들웨어는 인메모리 키값저장소인 <a href=\"https://redis.io/\">Redis</a>를 통해 입출력한다.</li>\n<li><a href=\"https://redis.io/\">Redis</a>는 패스워드를 통해 보호되며 <code>6380</code>포트를 사용한다.</li>\n<li>SMS전송은 <a href=\"http://coolsms.co.kr\">coolsms</a>의 API를 이용한다. 계정 문의(eunchurn.park@gmail.com)</li>\n<li>매 30분 마다 LTE라우터의 <code>OpenWRT</code> 에 접속하여 네트워크 정보를 받아온다. 윈도우OS의 경우 <code>plink.exe</code> 파일을 실행하여, LTE 라우터의 네트워크 정보를 받아온다.</li>\n</ul>\n<ul>\n<li>Linux의 경우</li>\n</ul>\n<blockquote>\n<p>IP 주소 : <code>sshpass -p wavent ssh root@192.168.10.1 /sbin/ifconfig ppp0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}’</code>\nRX : <code>sshpass -p wavent ssh root@192.168.10.1 /sbin/ifconfig ppp0 | grep 'RX bytes:' | cut -d: -f2 | awk '{ print $1}’</code>\nTX : <code>sshpass -p wavent ssh root@192.168.10.1 /sbin/ifconfig ppp0 | grep 'RX bytes:' | cut -d: -f3 | awk '{ print $1}’</code></p>\n</blockquote>\n<ul>\n<li>Windows의 경우</li>\n</ul>\n<blockquote>\n<p>IP 주소 : <code>plink -v root@192.168.10.1 -pw wavent &quot;/sbin/ifconfig ppp0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}’”</code>\nRX : <code>plink -v root@192.168.10.1 -pw wavent &quot;/sbin/ifconfig ppp0 | grep 'RX bytes:' | cut -d: -f2 | awk '{ print $1}’”</code>\nTX : <code>plink -v root@192.168.10.1 -pw wavent &quot;/sbin/ifconfig ppp0 | grep 'RX bytes:' | cut -d: -f3 | awk '{ print $1}’”</code></p>\n</blockquote>\n<ul>\n<li>현재 이벤트 데이터는 <code>SHTechLog</code> 디렉토리의 파일변화를 모니터링하여 이벤트를 발생시켜 원격서버로 전송하게 한다. (추후 알고리즘 프로그램이 직접 보낼 수 있도록 수정예정)</li>\n<li>본 웹어플리케이션의 버젼관리는 <code>git</code> 시스템을 사용하고 있으며, 비공개 저장소인 <a href=\"https://bitbucket.org\">bitbucket.org</a>을 사용한다.</li>\n</ul>\n<h3>현장 PC 설치</h3>\n<h4>현장 PC 요구사항</h4>\n<h5>Linux</h5>\n<ul>\n<li>Ubuntu 16.04 권장 (현장은 현재 Windows 10 x64 설치)</li>\n<li>Docker 설치 (개발될 추가 버젼에서는 <a href=\"http://www.docker.com\">Docker</a>를 사용하여 가상화시킬 예정)</li>\n<li>node package manager <a href=\"https://www.npmjs.com/\">npm</a>과 <a href=\"https://nodejs.org/ko/\">node.js</a> 설치</li>\n<li><code>$ git pull git@bitbucket.org:shtpi-m2m-team/shtpi-cctv-was.git</code> 소스코드 클론</li>\n<li><code>$ cd shtpi-cctv-was</code> 클론한 폴더로 이동</li>\n<li><code>$ npm install</code> 백엔드 및 프론트엔드 의존성 모듈 한번에 설치</li>\n<li><code>env.example</code>파일을 열어 원격 서버의 호스트 주소와 포트 그리고 DB암호 설정</li>\n<li>서버 실행 <code>$ npm start</code> 혹은 <code>$ node app.js</code></li>\n<li>지속적인 로그 모니터링을 위해 <code>forever</code>데몬을 설치</li>\n<li><code>$ npm install forever -g</code></li>\n<li>데몬으로 서버 시작 <code>$ forever start app.js</code></li>\n</ul>\n<h5>Windows 10 : Linux와 동일</h5>\n<h3>원격 서버 설치</h3>\n<h4>Linux 설치</h4>\n<ul>\n<li>node package manager <a href=\"https://www.npmjs.com/\">npm</a>과 <a href=\"https://nodejs.org/ko/\">node.js</a> 설치</li>\n<li><a href=\"https://redis.io/\">Redis</a> 설치</li>\n<li><a href=\"https://www.mongodb.com/\">MongoDB</a> 설치</li>\n<li>각 DB 암호화 설정</li>\n<li><code>$ git pull git@bitbucket.org:shtpi-m2m-team/shtpi-cctv-was.git</code> 소스코드 클론</li>\n<li><code>$ cd shtpi-cctv-was</code> 클론한 폴더로 이동</li>\n<li><code>$ npm install</code> 백엔드 및 프론트엔드 의존성 모듈 한번에 설치</li>\n<li><code>env.example</code>파일을 열어 원격 서버의 호스트 주소와 포트 그리고 DB암호 설정</li>\n<li>서버 실행 <code>$ npm start</code> 혹은 <code>$ node app.js</code></li>\n<li>지속적인 로그 모니터링을 위해 <code>forever</code>데몬을 설치</li>\n<li><code>$ npm install forever -g</code></li>\n<li>데몬으로 서버 시작 <code>$ forever start app.js</code></li>\n</ul>\n<h3>Vesion Log</h3>\n"
  },
  "url": "http://shtpiserver.iptime.org:3000",
  "name": "CCTV-AOD Web Dashboard",
  "sampleUrl": false,
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2017-02-21T10:14:51.893Z",
    "url": "http://apidocjs.com",
    "version": "0.17.5"
  }
});