<script setup>
import { db}  from '@/firebase'
import { collection, getDocs } from "firebase/firestore";
import { onMounted, ref } from 'vue';
import { useAppointStore } from '../stores/appoint'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net';

const appoint = useAppointStore()
DataTable.use(DataTablesCore);

const columns = [
	{ data: 'email' },
	{ data: 'history' },
	{ data: 'jumin' },
	{ data: 'memo' },
	{ data: 'name' },
	{ data: 'phone' },
	{ data: 'why' },
]


</script>

<template>
  <main>   
    
    <DataTable class="display" :columns="columns" :data="appoint.appointState" :options="{ select: true }" >
      <thead>
        <tr>
          <th>Email</th>
          <th>History</th>
          <th>Jumin</th>
          <th>Memo</th>
          <th>Name</th>
          <th>Phone</th>
			    <th>Why</th>
        </tr>
      </thead>
    </DataTable>
  </main>
</template>
