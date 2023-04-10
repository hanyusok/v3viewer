<script setup>
import { onMounted, ref, render } from 'vue'
import axios from 'axios'
import qs from 'qs'
import { NButton, NCard } from 'naive-ui'


//kakao scripts start from here
const kakaoLogin = () => {
    Kakao.Auth.authorize({
        redirectUri: 'http://localhost:5173/data',
        throughTalk: true,
        scope: 'friends, talk_message'
    })
}

const kakaoLogOut = () => {
    Kakao.Auth.logout()
        .then((resp) => {
            Swal.fire(`로그아웃!`)
            console.log(Kakao.Auth.getAccessToken())
        })
        .catch((err) => {
            console.log('not logged in')
        })
}


const authCode = location.search.substring(6)
const access_token = ref('')
const kakaOptions = {
    'grant_type': 'authorization_code',
    'client_id': '3c4ba9cc89263b9e66bca4c176a4eaf3',
    'client_secret': '8orFiiKOUqaaP5N1fbwfARNMmIuPpJCG',
    'code': authCode,
    'redirect_uri': 'http://localhost:5173/data'
}

onMounted(async () => {
    await axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: qs.stringify(kakaOptions),
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

//수납금액
const cost = ref()
const shareMsgInfo = (cost) => {
    Kakao.Share.sendCustom({
        templateId: 85061,
        templateArgs: {
            COST: cost
        }
    });
}

//처방전 전송
const shareMsgPharm = () => {
    Kakao.Share.sendCustom({
        templateId: 85349
    });
}

//검사결과 알림
const sharelab = () => {
    Kakao.Share.sendCustom({
        templateId: 92230
    });
}

//팩스 이메일 전송
const picked = ref("")
const shareFaxEmail = (picked) => {
    Kakao.Share.sendCustom({
        templateId: 92231,
        templateArgs: {
            WAY: picked
        }
    });
}

//메모 보내기
const name = ref("")
const memo = ref("")
const shareMemo = (name, memo) => {
    Kakao.Share.sendCustom({
        templateId: 92233,
        templateArgs: {
            NAME: name,
            MEMO: memo
        }
    });
}

</script>

<template>
    <div class="container">
        <h3>카카오 메세지 서비스</h3>
        
        <!-- <div style="display: flex;">
            <p>Status: </p>
            <button class="btn" v-if="!access_token" @click="kakaoLogin">로그인</button>
            <button class="btn" v-if="access_token" @click="kakaoLogOut">로그아웃</button>
        </div> -->

        <div style="display: inline">
            <p>수납 금액: </p>
            <input class="moneyInput" v-model.lazy="cost" placeholder="금액" />
            <button class="btn" @click="shareMsgInfo(cost)">수납</button>
        </div>

        <div>
            <button class="btn" @click="shareMsgPharm">문전약국</button>
        </div>


        <div style="display: flex;">
            <label>Fax</label>
            <input type="radio" id="fax" value="fax" v-model="picked" />
            <label>Email</label>
            <input type="radio" id="email" value="email" v-model="picked" />
            <button class="btn" @click="shareFaxEmail(picked)">전송</button>
        </div>

        <div>
            <button class="btn" @click="sharelab">검사결과 알림톡</button>
        </div>


        <div>
            <input class="input" v-model.lazy="name" placeholder="이름" />
            <textarea class="textarea" v-model.lazy="memo" placeholder="메모" rows="2"></textarea>
            <button class="btn" @click="shareMemo(name, memo)">전송</button>
        </div>
    </div>

    
    <n-card title="Status">
        <n-button v-if="!access_token" @click="kakaoLogin">카카오로그인</n-button>
        <n-button v-if="access_token" @click="kakaoLogOut">카카오로그아웃</n-button>
    </n-card>
    <n-card title="Card">
    Card Content
    </n-card>
    <n-card title="Card">
    Card Content
    </n-card>
</template>

<style>
.main {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    font-weight: normal;

}

.n-card {
  max-width: 300px;
  display: inline-flex;
}

</style>

