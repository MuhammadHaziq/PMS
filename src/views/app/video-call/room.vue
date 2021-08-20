<template>
  <div class="hello">
    <div class="agora-title-box">
      <div class="agora-title">Agora Basic Video Call</div>
    </div>
    <div class='agora-box'>
      <!-- <div class="agora-input">
        <div class="agora-text">* Appid</div>
        <b-input v-model="option.appid" placeholder="Appid" clearable></b-input>
      </div>
      <div class="agora-input">
        <div class="agora-text">Token</div>
        <b-input v-model="option.token" placeholder="Token" clearable></b-input>
      </div>
      <div class="agora-input">
        <div class="agora-text">* Channel Name</div>
        <b-input v-model="option.channel" placeholder="Channel Name" clearable></b-input>
      </div>
      <div class="agora-input">
        <div class="agora-text">* UserID</div>
        <b-input v-model="option.uid" placeholder="User ID" clearable></b-input>
      </div> -->
      <div class="agora-button">
        <b-button type="primary" @click="joinEvent" :disabled='disableJoin'>join</b-button>
        <b-button type="primary" @click='leaveEvent' plain :disabled='!disableJoin'>leave</b-button>
      </div>
    </div> 
    <div class="agora-view">
      <div class="agora-video">
        <StreamPlayer :stream="localStream" :domId="localStream.getId()" v-if="localStream"></StreamPlayer>
      </div>
      <div class="agora-video" :key="index" v-for="(remoteStream, index) in remoteStreams">
        <StreamPlayer :stream="remoteStream" :domId="remoteStream.getId()"></StreamPlayer>
      </div>
    </div>   
  </div>
</template>

<script>
import RTCClient from "../../../agora-rtc-client";
import StreamPlayer from "../../../components/video/stream-player.vue";
import Util from "@/utils";

export default {
  components: {
    StreamPlayer
  },
  data () {
    let option = {};
    if(this.$route.query.uid && this.$route.query.chname && this.$route.query.token){
      option = {
          appid: '3ba54db40a1740d0a646eeacd1cc8495',
          token: this.$route.query.token,
          uid: this.$route.query.uid,
          channel: this.$route.query.chname
      }
    }
    return {
      option: option,
      disableJoin: false,
      localStream: null,
      remoteStreams: [],
    }
  },
  props: {
    msg: String
  },
  
  methods: {
    joinEvent () {
      if(!this.option.appid) {
        this.judge('Appid')
        return
      }
      if(!this.option.channel) {
        this.judge('Channel Name')
        return
      }
      this.rtc.joinChannel(this.option).then(() => {
            this.$bvToast.toast('Join Success', {
                title: `Information`,
                variant: 'success',
                solid: true,
            });        
            this.rtc.publishStream().then((stream) => {
                this.$bvToast.toast('Publish Success', {
                    title: `Notice`,
                    variant: 'success',
                    solid: true,
                });
                this.localStream = stream
            }).catch((err) => {
                this.$bvToast.toast('Publish Failure', {
                    title: `Error`,
                    variant: 'danger',
                    solid: true,
                });
                Util.log('publish local error', err)
            })
      }).catch((err) => {
        this.$bvToast.toast('Join Failure', {
            title: `Error`,
            variant: 'danger',
            solid: true,
        });
        Util.log('join channel error', err)
      })
      this.disableJoin = true
    },
    leaveEvent () {
      this.disableJoin = false
      this.rtc.leaveChannel().then(() => {
        this.$bvToast.toast('Leave Success', {
            title: `Notice`,
            variant: 'success',
            solid: true,
        });
      }).catch((err) => {
        this.$bvToast.toast('Leave Failure', {
            title: `Error`,
            variant: 'danger',
            solid: true,
        });        
        Util.log('leave error', err)
      })
      this.localStream = null
      this.remoteStreams = []
    },
    judge(detail) {
        this.$bvToast.toast(`Please enter the ${detail}`, {
            title: `Notice`,
            variant: 'warning',
            solid: true,
        });
    },
  },
  created() {
    this.rtc = new RTCClient()
    let rtc = this.rtc
    rtc.on('stream-added', (evt) => {
      let {stream} = evt
      Util.log("[agora] [stream-added] stream-added", stream.getId())
      rtc.client.subscribe(stream)
    })
      
    rtc.on('stream-subscribed', (evt) => {
      let {stream} = evt
      Util.log("[agora] [stream-subscribed] stream-added", stream.getId())
      if (!this.remoteStreams.find((it) => it.getId() === stream.getId())) {
        this.remoteStreams.push(stream)
      }
    })

    rtc.on('stream-removed', (evt) => {
      let {stream} = evt
      Util.log('[agora] [stream-removed] stream-removed', stream.getId())
      this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== stream.getId())
    }) 

    rtc.on('peer-online', (evt) => {
      this.$bvToast.toast(`Peer ${evt.uid} is online`, {
          title: `Notice`,
          variant: 'success',
          solid: true,
      });
    }) 

    rtc.on('peer-leave', (evt) => {
      this.$bvToast.toast(`Peer ${evt.uid} already leave`, {
          title: `Notice`,
          variant: 'success',
          solid: true,
      });
      this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== evt.uid)
    }) 
  }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .agora-box {

  }
  .agora-title {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: #2c3e50;
  }
  .agora-view {
    display: flex;
    flex-wrap: wrap;
  }
  .agora-video {
    width: 320px;
    height: 240px;
    margin: 20px;
  }
  .agora-input {
    margin: 20px;
    width: 320px;
  }
  .agora-text {
    margin: 5px;
    font-size: 16px;
    font-weight: bold;
  }
  .agora-button {
    display: flex;
    width: 160px;
    justify-content: space-between;
    margin: 20px;
  }
  .agora-video {
    width: 320px;
    height: 240px;
  }
</style>
