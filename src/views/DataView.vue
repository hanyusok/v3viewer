<script setup>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net';
// import Jszip from 'jszip';
// import pdfmake from 'pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts'
// import DataTable from 'datatables.net-dt';
// import buttons from 'datatables.net-buttons-dt';
// import 'datatables.net-buttons/js/buttons.colVis.mjs';
// import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5.mjs';
// import 'datatables.net-buttons/js/buttons.print.mjs';
// import 'datatables.net-responsive-dt';
// import 'datatables.net-select-dt';



import languageKO from 'datatables.net-plugins/i18n/ko.json'
import { onMounted, ref, render } from 'vue'
import { db}  from '@/firebase'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { format, formatDistance, formatDistanceStrict, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/esm/locale'

import { Vue3ToggleButton } from 'vue3-toggle-button'
import  Swal  from 'sweetalert2'


// pdfmake.vfs = pdfFonts.pdfmake.vfs;
// window.Jszip = Jszip
DataTable.use(DataTablesCore)
// DataTable.use(pdfmake)
// DataTable.use(ButtonsHtml5)
//initialize
const colRef = collection(db, "appointments")
const q = query(colRef, orderBy('createdAt', 'asc'))
const aptRef = ref([])
let appointments = aptRef.value  
const options = {  
  // dom: 'Bfrtip', 테이블wrap없어진다
  responsive: true,
  select: true,
  language: languageKO,
  // buttons: ['copy']
}




const unsubscribe = onSnapshot(q, (snap) => {
      snap.docChanges().forEach((change) =>{  
            let changedata = change.doc.data()

            //DateTime Conversion
            let preDate = changedata.createdAt.toDate()
            if (preDate){              
              // changedata.createdAt = formatDistance(preDate, new Date(), { locale: ko})
              changedata.createdAt = format(preDate, " MM월dd일p", { locale: ko})
            }

            //when new appointment add
            changedata.id = change.doc.id    
            if (change.type === "added") {                          
              appointments.unshift(changedata)
             
                  Swal.fire(`${changedata.name},  ${changedata.createdAt} 신청! `)
             
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
      (error) =>{
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
  // { data: 'kakao' },
	{ data: 'why' },
  { data: 'email' },
]

</script>

<template>
  <main>       
    <DataTable class="display" :columns="columns" :data="aptRef" :options="options" >
      <thead>
        <tr>  
          <th>날짜</th>
          <th>이름</th>
          <th>주민번호</th>          
          <th>재진?</th>          
          <th>메모</th>          
          <th>핸드폰</th>
          <!-- <th>카톡</th> -->
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
          <!-- <th>카톡</th> -->
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
/* @import 'datatables.net-select-bs5'; */
@import '../../node_modules/vue3-toggle-button/dist/style.css';
</style>
