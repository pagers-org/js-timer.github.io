# 👋 짝 프로그래밍 두 번째 앱! 👋
> 바닐라 자바스크립트로 구현한 타이머🤩

<br>
<hr>

## 📜 기능 목록 📜

<br>
<hr>

## ✍️ 커밋 목록 ✍️

<br>
<hr>

## 🛠 Contributors 🛠

<table>
  <tr height="140px">
    <td align="center">
      <a href="https://github.com/InSeong-So"><img height="100px" width="100px" src="https://avatars.githubusercontent.com/u/18283006?v=4"/></a>
      <br />
      <a href="https://github.com/InSeong-So">InSeong-So</a>
    </td>
    <td align="center">
      <a href="https://github.com/programmer-heeney"><img height="100px" width="100px" src="https://avatars.githubusercontent.com/u/66028045?v=4"/></a>
      <br />
      <a href="https://github.com/programmer-heeney">heeney</a>
    </td>
  </tr>
</table>

<hr>

## CI/CD 테스트

```sh
aws 가입
ec2 ami 선택(ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server), t2-micro, 22/80/9999, 키 새로 생성(jenkins-ec2)

window 에서는 폴더 권한을 제거해준다

cd 디렉토리
ssh -i "jenkins-ec2.pem" AWS_IP

$ sudo apt update -y

$ sudo apt upgrade -y

$ sudo apt install -y openjdk-11-jdk

$ sudo apt install -y docker.io

$ sudo apt install -y nginx

$ wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add

$ echo deb http://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list

$ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FCEF32E745F2C3D5

$ sudo apt update -y

$ sudo apt install -y jenkins

$ sudo vi /etc/default/jenkins
HTTP_PORT=9999

$ sudo systemctl restart jenkins

http://퍼블릭IP:9999
[초기비밀번호] sudo cat /var/lib/jenkins/secrets/initialAdminPassword

$ cd /etc/nginx

$ sudo rm nginx.conf

$ sudo vi nginx.conf

$ sudo systemctl reload nginx

$ sudo usermod -aG docker jenkins

$ sudo su -s /bin/bash jenkins

$ mkdir /var/lib/jenkins/.ssh

$ ssh-keygen -t rsa -b 4096 -C "wh-key" -f /var/lib/jenkins/.ssh/jenkins-github-wh

$ cat /var/lib/jenkins/.ssh/jenkins-github-wh.pub

젠킨스 관리 - Manage Credentials - add credential - SSH Username with private key
Scope를 Global의 Jenkins Node로 설정한 뒤, Username 을 아까 만들어준 RSA Key의 이름과 동일하게 설정

$ cat /var/lib/jenkins/.ssh/jenkins-github-wh

대시보드-새로운Item-Freestyle Project
```