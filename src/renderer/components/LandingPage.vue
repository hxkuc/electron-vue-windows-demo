<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          electron-vue-windows
        </span>
        <div class="doc">
          <p><button class="alt" @click="openNoNameWindow">打开新窗口无name属性可重复打开</button></p>
          <p><button class="alt" @click="openWin('win1')">打开name为win1的窗口</button></p>
          <p><button class="alt" @click="openWin('win2')">打开name为win2的窗口</button></p>
          <p><button class="alt" @click="openWinReload('win1')">打开win1并重新加载内容</button></p>
          <p><button class="alt" @click="openWinData('win3')">打开win3并发送数据</button><span class="backDataClass">返回的数据是： {{backData}}</span></p>
        </div>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">只接收窗口win1发送过来的数据</div>
          <textarea  :value="win1Info" cols="30" rows="3"></textarea>
          <div class="title">只接收窗口win2发送过来的数据</div>
          <textarea  :value="win2Info" cols="30" rows="3"></textarea>
          <div class="title">接收所有窗口发送过来的数据</div>
          <textarea  :value="winInfo" cols="30" rows="3"></textarea>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    data () {
      return {
        backData: '',
        win1Info: '',
        win2Info: '',
        winInfo: ''
      }
    },
    methods: {
      openNoNameWindow () {
        this.$Win.openWin({
          width: 800,
          height: 600,
          router: '/home'
        })
      },
      openWin (name) {
        this.$Win.openWin({
          width: 800,
          height: 600,
          router: '/home',
          name: name
        })
      },
      openWinReload (name) {
        this.$Win.openWin({
          width: 800,
          height: 600,
          router: '/',
          name: name,
          reload: true
        })
      },
      async openWinData (name) {
        let data = await this.$Win.openWin({
          width: 800,
          height: 600,
          router: '/dataWindow',
          name: name,
          data: {name: '我是参数'}
        })
        this.backData = data
      }
    },
    mounted: function () {
      // 监听来自win1的信息
      this.$Win.getMsg((d) => {
        this.win1Info += '来自' + d.fromWinName + '的信息：' + d.data + '\r\n'
      }, ['win1'])

      // 监听来自win2的信息
      this.$Win.getMsg((d) => {
        this.win2Info += '来自' + d.fromWinName + '的信息：' + d.data + '\r\n'
      }, ['win2'])

      // 接收所有窗口的信息
      this.$Win.getMsg((d) => {
        this.winInfo += '来自' + d.fromWinName + '的信息：' + d.data + '\r\n'
      })
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100%;
    padding: 60px 80px;
    width: 100%;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
  .backDataClass{
    color: #42b983;
    font-size: .8em;
    margin-left: 5px
  }

  textarea {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
</style>
