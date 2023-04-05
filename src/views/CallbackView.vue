<script setup>
import { async } from '@firebase/util';
import axios  from 'axios'
import qs from 'qs'
import { onMounted, ref } from 'vue'

const authCode = location.search.substring(6)
const access_token = ref('')
const options = {
          'grant_type': 'authorization_code',
          'client_id': '3c4ba9cc89263b9e66bca4c176a4eaf3',            
          'client_secret': '8orFiiKOUqaaP5N1fbwfARNMmIuPpJCG',          
          'code': authCode,
          'redirect_uri': 'http://localhost:5173/callback'
        }

onMounted(async() => {     
    await axios({
        method: 'POST',       
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
        data: qs.stringify(options),
        url: 'https://kauth.kakao.com/oauth/token'
      })
      .then((response) => {                              
          Kakao.Auth.setAccessToken(response.data.access_token)
          access_token.value = Kakao.Auth.getAccessToken()
          console.log(`access_token : ${access_token.value}`)
      })          
      .catch((err) => {
      })
})

/* const talkToSelf = () => {
  Kakao.API.request({
      url: '/v2/api/talk/memo/default/send',
      data: {
        template_object: {
          object_type: 'feed',
          content: {
            title: '마트의원 테스트',
            description: '#예약 #비대면',
            image_url:
              'https://thumbs.dreamstime.com/b/doctor-19425853.jpg',
            link: {
              // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
              mobile_web_url: 'http://calldoctor.co.kr',
              web_url: 'http://calldoctor.co.kr',
            },
          },
          social: {
            like_count: 286,
            comment_count: 45,
            shared_count: 845,
          },
          buttons: [
            {
              title: '웹으로 보기',
              link: {
                mobile_web_url: 'http://localhost:5173',
                web_url: 'http://localhost:5173',
              },
            },
            {
              title: '앱으로 보기',
              link: {
                mobile_web_url: 'http://localhost:5173',
                web_url: 'http://localhost:5173',
              },
            },
          ],
        },
      },
    })
      .then((res) => {
        //alert('success: ' + JSON.stringify(res))
        console.log('success(talkToSelf): ', JSON.stringify(res))
      })
      .catch((err) => {
        //alert('error: ' + JSON.stringify(err))
        console.log('error: ', JSON.stringify(err))
      })
} */

/* const talkToFriends = () => {
    if (!confirm('메시지를 전송하시겠습니까?')) { return }

    Kakao.Picker.selectFriends({
      title: '친구선택',
      showMyProfile: false,
      maxPickableCount: 10,
      minPickableCount: 1,
    })
    .then((res) => {
        const uuids = res.users.map((e) => { return e.uuid })

        return Kakao.API.request({
          url: '/v1/api/talk/friends/message/default/send',
          data: {
            receiver_uuids: uuids,
            template_object: {
              object_type: 'feed',
              content: {
                title: '비대면 테스트',
                description:
                  '#마트의원 #비대면 #접종 #안성 #롯데마트',
                image_url:
                  'https://mblogthumb-phinf.pstatic.net/MjAxNzA4MjlfMTg4/MDAxNTAzOTY4OTE5ODEx.9dk1srLaMI4MeSHtA-zMNBQ3KEVRu4xKq2-1ABLngfcg.6z2Xs6KFZ9agG8rAGDPbusZgSv3sr4ytPnxX3zLe51Eg.JPEG.umkr61/%EB%A1%AF%EB%8D%B0%EB%A7%88%ED%8A%B8_%EC%95%88%EC%84%B1%EC%A0%90_28.JPG?type=w800',
                link: {
                  // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
                  mobile_web_url: 'http://localhost:5173',
                  web_url: 'http://localhost:5173',
                },
              },
              social: {
                like_count: 286,
                comment_count: 45,
                shared_count: 845,
              },
              buttons: [
                {
                  title: '웹으로 보기',
                  link: {
                    mobile_web_url: 'http://localhost:5173',
                    web_url: 'http://localhost:5173',
                  },
                },
                {
                  title: '앱으로 보기',
                  link: {
                    mobile_web_url: 'http://localhost:5173',
                    web_url: 'http://localhost:5173',
                  },
                },
              ],
            },
          },
        });
      })
      .then((res) => {        
        console.log('success(talkToFriends): ', JSON.stringify(res))
      })
      .catch((err) => {        
        console.log('error(talkToFriends): ', JSON.stringify(err))
      })
  } */

const shareMsg = () => {
  Kakao.Share.sendCustom({
    templateId: 85061,
    templateArgs: {
      title: '연습용',
      description: '설명해보자'
    }
  });
}



/* const getFriendList = () => {
  axios.get('https://kapi.kakao.com/v1/api/talk/friends', { 
    headers: {
      Authorization: `Bearer ${Kakao.Auth.getAccessToken()}`
  }})
    .then((resp) => {
      console.log(resp)
    })
    .catch((err) => {
      console.log(err)
    })
} */

/* const getMyInfo = () => {
  axios.get('https://kapi.kakao.com/v1/api/talk/profile', { 
    headers: {
      Authorization: `Bearer ${Kakao.Auth.getAccessToken()}`      
  }})
    .then((resp) => {
      console.log(resp)
    })
    .catch((err) => {
      console.log(err)
    })

} */

</script>


<template>
  <div>
    <h1>This is an callback page</h1>
    <!-- <p>authCode : {{ authCode }} </p> 
    <hr>            
    <p>access_Token : {{ access_token }} </p>  -->
    <!-- <button @click="talkToSelf">나에게 톡보내기</button> -->
   <!--  <hr>
    <button @click="talkToFriends">친구에게 톡보내기</button>
    <hr> -->
    <button @click="shareMsg()">공유 톡보내기</button>

    <a id="kakaotalk-sharing-btn" @click="shareMsg()"><img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
    alt="카카오톡 공유 보내기 버튼" /></a>

    <!-- <button @click="getFriendList">친구리스트 보기</button>
    <button @click="getMyInfo">개인정보 보기</button> -->
    
  </div>
</template>

<style>

</style>
