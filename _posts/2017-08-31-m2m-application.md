---
layout:     post
title:      M2M 웹어플리케이션
date:       2017-08-25 19:21:29
summary:    2017년 박은천 작성
---
## M2M 프로젝트 중 센서노드와 각 N키퍼에서 구동되는 웹어플리케이션 시스템
### PREFACE

<button>API DOCS</button> <button>Repository</button> <button> Application</button>

## M2M Server Admin Application

`node.js` based Libelium Waspmote sensor parser with Xbee Digimesh and SX1272 LoRa networks by using [`Node Serialport`](https://github.com/voodootikigod/node-serialport).
Administrator web server include monitoring dashboard with [dyGraphs](https://https://github.com/danvk/dygraphs) and [ngRadialGauge](https://github.com/stherrienaspnet/ngRadialGauge).

Sensors data is streaming display and get from `Redis` (in-memory key-value store) [`node-redis`](https://github.com/NodeRedis/node_redis).This codes are involved in M2M Project of S.H.Technology & Policy Institute.

## Smart N Keeper Installation
### Ubuntu 설치 (USB 부트)

### 로그인 계정 설정
- 설치시 로그인 계정 `shtpi` 컴퓨터 이름 `nkeeper###` 비밀번호 `tmdghk` (승화)로 설정 (###는 N Keeper의 번호)

### 자동실행스크립트 `m2m_combined.sh` 실행
- `/scripts`폴더에 `m2m_combined.sh`와 `m2mserver.sh`를 다운로드 후
- 스크립트 파일 수정 `$ nano m2m_combined.sh`
```
#!/bin/sh
sudo sed -i 's/kr.archive.ubuntu.com/ftp.daum.net/g' /etc/apt/sources.list #우분투 업데이트 리스트 및 저장소 변경
sudo apt-get update
sudo apt-get install -y openssh-server
sudo apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y redis-server
sudo apt-get install -y git
git clone https://github.com/haykin/m2m-server-main
git config --global user.email "eunchurn.park@gmail.com"
git config --global user.name "eunchurn"
sudo npm install forever -g
sudo cp m2mserver.sh /etc/init.d/m2mserver
sudo chmod +x /etc/init.d/m2mserver
sudo chown root:root /etc/init.d/m2mserver
sudo update-rc.d m2mserver defaults
cd m2m-server-main
sudo npm install
sudo npm install bower -g
cd views
bower install
sudo add-apt-repository ppa:webupd8team/atom
sudo apt-get update
sudo apt-get install -y atom
sudo apt-get install -y screen
sudo apt-get install -y xdotool
sudo apt-get install -y python3-pip
pip3 install django
pip3 install numpy
pip3 install django-extensions
pip3 install xlrd
sudo sed -i s/enabled=1/enabled=0/ /etc/default/apport
```
- M2M 웹서버 자동 실행 스크립트 수정 `m2mserver.sh`
```
#!/bin/bash

### BEGIN INIT INFO
# Provides:          shtech
# Required-Start:    $local_fs $network
# Required-Stop:     $local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: m2mserver
# Description:       s.h. Tech & policy
### END INIT INFO
export PATH=$PATH:/usr/bin
export NODE_PATH=$NODE_PATH:/usr/lib/node_modules

case "$1" in
    start)
        echo "Starting M2M Server"
        (cd /home/shtpi/m2m-server-main/ && sudo forever start m2mserver.js);; #실행되는 위치 변경
    stop)
        echo "Stopping M2M Server"
        (sudo forever stop /home/shtpi/m2m-server-main/m2mserver.js);; #실행되는 위치 변경
    *)
        echo "Usage: /etc/init.d/m2mserver {start|stop}"
        exit 1
        ;;
esac

exit 0

```
- 스크립트 실행 권한 설정 `$ chmod +x m2m_combined.sh`
- `$ ./m2m_combined.sh` 실행

### M2M Server Admin 설치
- Gateway의 주소 확인 `serialconfigure.json`파일에 저장되어 있다.
- 게이트웨이를 꽂고 시리얼 확인: `dmesg | grep tty` 에서 `ttyUSB0`가 있는지 확인
```
[    0.000000] console [tty0] enabled
[    0.683236] 00:02: ttyS0 at I/O 0x3f8 (irq = 4, base_baud = 115200) is a 16550A
[    0.703684] 00:03: ttyS1 at I/O 0x2f8 (irq = 3, base_baud = 115200) is a 16550A
[    9.957341] usb 1-1.2: FTDI USB Serial Device converter now attached to ttyUSB0
```
- 0번이 아니거나 다를 경우 아래와 같이 수정
- Gateway의 시리얼 주소 수정 `nano serialconfigure.json` (comName이 동일하면 설정할 필요 없음)
```
{"comName":"/dev/ttyUSB0","baudRate":"38400"}
```
- 서버 실행
- `$ npm start`
- 브라우저를 구동시켜서 `localhost`으로 접속한다.

# 센서 데이터 읽어오는 방법
참고 : 센서노드의 모든 데이터는 최초 Redis에 저장이 되며, 오래된 데이터는 mongodb로 이전하고 이전한 Redis의 데이터는 삭제됩니다. 

## Recent data
가장 최근 데이터는 다음과 같이 불러 옵니다.

- 최근 1개 데이터 `/data?sensorNode= + $nodeId + &nStart=-1&nStop=-1`
- 최근 10개 데이터 `/data?sensorNode= + $nodeId + &nStart=-10&nStop=-1`
- 최초 1개 데이터 `/data?sensorNode= + $nodeId + &nStart=0&nStop=0`
- 최초 10개 데이터 `/data?sensorNode= + $nodeId + &nStart=0&nStop=9`
- `sensorNode=$nodeId` : 스트링 변수 `SHTPI001`에서 `SHTPI016`를 나타냅니다. 18번까지 설치할 예정입니다.

ex) `http://shtpiserver.iptime.org/data?sensorNode=SHTPI010&nStart=-1&nStop=-1` (회사 외부접속의 경우)
ex) `http://192.168.1.18/data?sensorNode=SHTPI010&nStart=-1&nStop=-1` (역무실의 경우)


## Time history
시간 데이터는 아래와 같이 불러옵니다. 리턴값은 csv(comma separated value)입니다. 첫번째 열은 시간 두번째 열은 데이터 입니다.

`/databydate?sensorNode=' + $nodeId + '&dateStart=' + $startTimestamp + '&dateStop=' + $endTimestamp + '&sensorName=' + $sensorId`

- `sensorNode=$nodeId` : 스트링 변수 `SHTPI001`에서 `SHTPI016`를 나타냅니다.
- `sensorName=$sensorId` : 스트링 변수 "센서 이름" 여기서 센서이름은 최근 1개 데이터에서 JSON 키값을 참고합니다(`Object.keys(JSON)`).
- `dateStart=$startTimestamp` : 스트링 변수, 불러올 데이터의 시작 타임스탬프입니다. 최근 1개의 데이터에서 JSON키 `"Time Stamp Server`"값에서 86400000값을 빼면 1day 전이 됩니다(24h x 60m x 60s x 1000ms)
- `dateStop=$endTimestamp` : 스트링 변수, 불러올 데이터의 마지막 타임스탬프입니다. 위와 같은 방법입니다. `$startTimestamp는 $startTimestamp`보다 작아야합니다. 타임스탬프는 항상 최근데이터를 기준으로 뽑으시면 될것 같습니다.

ex) `http://shtpiserver.iptime.org/databydate?sensorNode=SHTPI001&dateStart=1464173160316&dateStop=1464259560316&sensorName="Oxygen"` (회사 외부접속의 경우)
ex) `http://192.168.1.18/databydate?sensorNode=SHTPI001&dateStart=1464173160316&dateStop=1464259560316&sensorName="Carbon Monoxide"` (역무실의 경우)

nkeeper001 : 192.168.0.114
nkeeper010 : 192.168.0.111
nkeeper012 : 192.168.0.98
nkeeper015 : 192.168.0.81

```
cd m2m-server-main
git pull origin master
sudo npm install
sudo npm install forever -g
cd scripts
```

```
sudo cp m2mserver.sh /etc/init.d/m2mserver
sudo chmod +x /etc/init.d/m2mserver
sudo chown root:root /etc/init.d/m2mserver
sudo update-rc.d m2mserver defaults
```


## 추후 진행사항
- N-keeper와 서버의 redis와 mongodb 연동 https://www.sitepoint.com/caching-a-mongodb-database-with-redis/
- `CoAP` 구현 : UDP를 이용한 CoAP 구현, 각 N-keeper의 주소를 JSON파일로 저장 후 각 N-keeper에서 서버로 CoAP 데이터 전송 https://github.com/1248/nodecoap
- N-keeper에 Wi-Fi 동글로 Wi-Fi Mesh 구현 http://skylit.tistory.com/180
- https://www.kics.or.kr/storage/paper/event/2015_summer/publish/3B-6.pdf