<template>
    <div>
        <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-circle-plus"></i>New</template>
          <el-menu-item index="1-1">
            <router-link to="/ns">New Station</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">New Path</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-search"></i>Search</template>
          <el-menu-item index="2-1">Search Station</el-menu-item>
          <el-menu-item index="2-2">Search Path</el-menu-item>
          <el-menu-item index="2-3">Search Route</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-delete"></i>Delete</template>
          <el-menu-item index="3-1">Delete Station</el-menu-item>
          <el-menu-item index="3-2">Delete Path</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-edit"></i>Update</template>
          <el-menu-item index="4-1">Update Station</el-menu-item>
          <el-menu-item index="4-2">Update Path</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: left; font-size: 40px">
      <span>PortEco Manager</span>
    </el-header>
    
    <el-main>
       <el-form :label-position="labelPosition" label-width="140px" :model="formLabelAlign">
      <el-form-item label="Name">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="Cargo amount">
        <el-input v-model="formLabelAlign.cargo"></el-input>
      </el-form-item>
    </el-form>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [],
            stationCargo: {
                station:"",
                cargo:""
            },
            labelPosition: 'right',
            formLabelAlign: {
            name: '',
            cargo: '',
        }
        }
    },
    methods: {
        
    },
    mounted () {
    }
}
</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    
    .el-aside {
        color: #333;
    }
</style>