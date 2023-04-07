<script setup>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net';
import languageKO from 'datatables.net-plugins/i18n/ko.json'
import { onMounted, ref, render } from 'vue'
import { db } from '@/firebase'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { format, formatDistance, formatDistanceStrict, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/esm/locale'
import Swal from 'sweetalert2'
import axios from 'axios'
import qs from 'qs'

DataTable.use(DataTablesCore)

//initialize of firestore
const colRef = collection(db, "appointments")
const q = query(colRef, orderBy('createdAt', 'asc'))
const aptRef = ref([])
let appointments = aptRef.value
const options = {
  responsive: true,
  select: true,
  language: languageKO,
}

const unsubscribe = onSnapshot(q, (snap) => {
  snap.docChanges().forEach((change) => {
    let changedata = change.doc.data()

    //DateTime Conversion
    let preDate = changedata.createdAt.toDate()
    if (preDate) {
      // changedata.createdAt = formatDistance(preDate, new Date(), { locale: ko})
      changedata.createdAt = format(preDate, " MM월dd일p", { locale: ko })
    }

    //when new appointment add
    changedata.id = change.doc.id
    if (change.type === "added") {
      appointments.unshift(changedata)
      //Swal.fire(`${changedata.name},  ${changedata.createdAt} 신청! `)
    }
    if (change.type === "modified") {
      let index = appointments.findIndex(apt => apt.id === changedata.id)
      Object.assign(appointments[index], changedata)
    }
    if (change.type === "removed") {
      let index = appointments.findIndex(apt => apt.id === changedata.id)
      appointments.splice(index, 1)
    }
  })
},
  (error) => {
    console.log(error)
  }
)

const columns = [
  { data: 'createdAt' },
  { data: 'name' },
  { data: 'jumin' },
  { data: 'history' },
  { data: 'memo' },
  { data: 'phone' },
  { data: 'why' },
  { data: 'email' },
]

//kakao scripts start from here
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

const kakaoLogin = () => {
  Kakao.Auth.authorize({
    redirectUri: 'http://localhost:5173/data',
    throughTalk: true,
    scope: 'friends, talk_message'
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


const picked = ref("")
const shareFaxEmail = (picked) => {
  Kakao.Share.sendCustom({
    templateId: 92231,
    templateArgs: {
      WAY: picked
    }
  });
}

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
  <main class="main">
    <div class="container">
      <!-- <h3>접수 데스크</h3> -->
      <div>
        <!-- <p>카톡 보내기: </p>   -->
        <button class="btn" v-if="!access_token" @click="kakaoLogin">로그인</button>
        <button class="btn" v-if="access_token" @click="kakaoLogOut">로그아웃</button>
      </div>
      
      <div>
        <input class="moneyInput" v-model.lazy="cost" placeholder="금액" />
        <button class="btn" @click="shareMsgInfo(cost)">수납</button>
      </div>
      
      <div>
        <button class="btn" @click="shareMsgPharm">문전약국</button>
      </div>
      

      <div>
        <label for="fax">Fax</label>
        <input type="radio" id="fax" value="fax" v-model="picked" />
        <label for="email">Email</label>
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
<!-- 여기부터 -->
   


  
    <DataTable class="display" :columns="columns" :data="aptRef" :options="options">
      <thead>
        <tr>
          <th>날짜</th>
          <th>이름</th>
          <th>주민번호</th>
          <th>재진?</th>
          <th>메모</th>
          <th>핸드폰</th>
          <th>내용</th>
          <th>이메일</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>날짜</th>
          <th>이름</th>
          <th>주민번호</th>
          <th>재진?</th>
          <th>메모</th>
          <th>핸드폰</th>
          <th>내용</th>
          <th>이메일</th>
        </tr>
      </tfoot>
    </DataTable>

  </main>
</template>
<style>
@import 'datatables.net-dt';
@import 'datatables.net-bs5';
@import '../../node_modules/sweetalert2/dist/sweetalert2.min.css';

.main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  
}  
.container { 
  background-color: whitesmoke; 
  border: #ccc 2px solid;
  border-radius: 8px;
  display: flex;
  padding: 10px 10px;
  /* height: 20vh; */
  
}

.moneyInput{
  width:auto;
  border: 2px solid grey;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: end;
}
.textarea {
  width: 100%;
  height: 100px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}
.btn {
  background-color: rgb(165, 236, 227);
  border: none;
  border-color: rgb(158, 201, 236) solid;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px ;
  height: 30px;
  outline: 1;
  text-align: center;
  width: 100%;
  padding: 10px px;
  text-decoration: none;
  display: inline-block;
}




</style>
