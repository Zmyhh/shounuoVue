<template>
    <div class="factory">
        <div>
            <!--新建与查询-->
            <div class="menuBox">
                <div class="QueryConditions">

                    <el-button size="mini" type="primary" class="el-icon-plus" @click="addfactory=true">新建</el-button>
                    <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                    <el-button type="danger" size="mini" class="el-icon-delete" :disabled="delStatusButGoods"
                               @click="delfactory">批量删除
                    </el-button>
                    <!--<el-button type="primary" size="mini">打印</el-button>-->
                </div>

                <div class="QueryConditions QueryInput">

                    <div>
                        <el-input size="mini" placeholder="所属公司" v-model="querycompany"></el-input>

                        <el-input size="mini" placeholder="名称" v-model="queryname"></el-input>

                        <el-input size="mini" placeholder="其他" v-model="queryspare01"></el-input>
                    </div>

                    <div>
                        <el-button type="primary" size="mini"
                                   @click="queryspare01='',queryname='',querycompany=''">
                            重置
                        </el-button>

                        <el-button type="primary" size="mini" icon="el-icon-search"
                                   @click="factoryquery()">查询
                        </el-button>
                    </div>


                </div>


            </div>
        </div>

        <div>
            <el-table
                    :data="factoryList"
                    border
                    stripe
                    ref="table"
                    :height="tableHeight"
                    @selection-change="factorySelection"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        type="selection"
                        width="50"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        v-if="nameShow"
                        width="150"
                        label="名称">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="code"
                        v-if="codeShow"
                        label="编码"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        label="工厂职能"
                        v-if="functionShow"
                        width="230"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.technologys">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="address"
                        v-if="addressShow"
                        label="城市"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        v-if="detailedAddressShow"
                        prop="detailedAddress"
                        label="详细地址"
                        width="180"
                >
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="company"
                        v-if="companyShow"
                        label="所属公司"

                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="contact"
                        v-if="contactShow"
                        label="联系人"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="phoneNumber"
                        width="150"
                        v-if="phoneNumberShow"
                        label="手机号码">
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        prop="createTime"
                        width="180"
                        v-if="createTimeShow"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="修改时间"
                        prop="updateTime"
                        width="180"
                        v-if="updateTimeShow"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="remark"
                        width="100"
                        v-if="remarkShow"
                        label="备注">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        width="120"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="upfactoryspanel(scope.row)">修改</el-button>
                        <el-button :disabled="scope.row.recordState=='rs01'?(true):(false)" type="text"
                                   @click="delfactoryspanel(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>


            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="factorylistpag"
                            :page-size="15"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNum">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>

        <!--显示设置-->
        <el-dialog
                title="显示设置"
                :show-close="false"
                :visible.sync="Settings"
                width="400px">
            <div style="text-align: left">
                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="nameShow">名称</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="codeShow">编码</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="addressShow">城市</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="detailedAddressShow">详细地址</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="companyShow">所属公司</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="contactShow">联系人</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="phoneNumberShow">手机号码</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="createTimeShow">创建时间</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="updateTimeShow">修改时间</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>

                    <el-col :span="8">
                        <el-checkbox v-model=" functionShow">工厂职能</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model=" remarkShow">备注</el-checkbox>
                    </el-col>
                </el-row>
            </div>


        </el-dialog>

        <!--新建厂商信息-->
        <el-dialog
                title="新建厂商信息"
                :show-close="false"
                :visible.sync="addfactory"
                width="800px"
        >

            <el-form size="mini" :model="addfactoryForm" ref="addfactoryForm" :rules="addfactorysrules"
                     label-width="100px"
                     label-position="right">

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="编码" prop="code">
                            <el-input placeholder="厂商编码" v-model="addfactoryForm.code"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="名称" prop="name">
                            <el-input placeholder="厂商名称" v-model="addfactoryForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">

                        <el-form-item label="工厂地址" prop="address">
                            <el-cascader
                                    placeholder="工厂地址"
                                    :options="option"
                                    v-model="address"
                                    @change="handleChange">
                            </el-cascader>
                        </el-form-item>

                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="8">
                        <el-form-item label="收货地址" prop="detailedAddress">
                            <el-input placeholder="收货地址"
                                      v-model="addfactoryForm.detailedAddress"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="联系人" prop="contact">
                            <el-input placeholder="联系人" v-model="addfactoryForm.contact"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机号码" prop="phoneNumber">
                            <el-input placeholder="手机号码" v-model="addfactoryForm.phoneNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="所属公司" prop="company">
                            <el-input placeholder="所属公司" v-model="addfactoryForm.company"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工艺职能" prop="technologys">
                            <el-select placeholder="请选择" multiple v-model="addfactoryForm.technologys">
                                <el-option
                                        v-for="item in ProcessFunction"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注信息">
                            <el-input placeholder="备注信息" v-model="addfactoryForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-form-item>
                    <el-button size="mini" type="primary" @click="submitForm('addfactoryForm')">立即创建</el-button>
                    <el-button size="mini" @click="addfactory=false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>

        <!--修改厂商信息-->
        <el-dialog
                title="修改厂商信息"
                :visible.sync="upfactory"
                @closed="closeFun"
                :show-close="false"
                width="800px"
        >

            <el-form size="mini" :model="upfactoryForm" ref="upfactoryForm" :rules="upfactorysrules" label-width="100px"
                     label-position="right">

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="编码" prop="code">
                            <el-input placeholder="厂商编码" v-model="upfactoryForm.code"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="名称" prop="name">
                            <el-input placeholder="厂商名称" v-model="upfactoryForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收货城市" prop="address">
                            <el-cascader
                                    placeholder="收货城市"
                                    :options="option"
                                    v-model="upaddress"
                                    @change="handleChange">
                            </el-cascader>
                        </el-form-item>

                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="8">
                        <el-form-item label="收货地址" prop="detailedAddress">
                            <el-input placeholder="收货地址" v-model="upfactoryForm.detailedAddress"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="联系人" prop="contact">
                            <el-input placeholder="联系人" v-model="upfactoryForm.contact"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机号码" prop="phoneNumber">
                            <el-input placeholder="手机号码" v-model="upfactoryForm.phoneNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="所属公司" prop="company">
                            <el-input placeholder="所属公司" v-model="upfactoryForm.company"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工艺职能" prop="technology">

                            <el-select placeholder="请选择" multiple v-model="upfactoryForm.technologys">
                                <el-option
                                        v-for="item in ProcessFunction"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>


                            <!---->
                            <!--<el-select placeholder="请选择" multiple  v-model="upfactoryForm.technology">-->
                            <!--<el-option-->
                            <!--v-for="item in ProcessFunction"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注信息">
                            <el-input placeholder="备注信息" v-model="upfactoryForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-form-item>
                    <el-button type="primary" @click="upsubmitForm('upfactoryForm')">立即修改</el-button>
                    <el-button @click="upfactory=false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>

    </div>
</template>

<script>
    import {regionData, CodeToText, TextToCode} from 'element-china-area-data'

    export default {
        name: "factory",
        data() {
            return {
                screenWidth: document.body.clientWidth,
                tableHeight: 0,//表格高度
                Settings: false,//显示设置
                pageSizeFactory: 15,//每页条目数
                pageNumFactory: 1,//当前页数
                factoryList: [],//工厂数据集合
                factoryIds: [],//工厂信息ID
                totalRecordNum: 0,
                addfactory: false,//新建厂商面板
                delStatusButGoods: true,//删除按钮
                upfactory: false,//修改厂商面板

                ProcessFunction: [
                    //工艺职能
                    {
                        label: '织造',
                        value: 'weave'
                    },
                    {
                        label: '缝头',
                        value: 'seamHead'
                    }
                    ,
                    {
                        label: '定型',
                        value: 'stereoType'
                    }
                    ,
                    {
                        label: '包装',
                        value: 'pack'
                    }
                ],
                addfactoryForm: {
                    //新建厂商信息表单数据
                    name: '',//名称
                    code: '',//编码
                    company: '',//所属公司
                    address: '',//地址
                    detailedAddress: '',//详细地址信息
                    contact: '',//联系人
                    phoneNumber: '',//手机号码
                    technologys: [],//工艺职能
                    remark: '',//备注信息

                },
                addfactorysrules: {
                    //新建厂商信息表单验证
                    name: [
                        {required: true, message: '请输入厂商名称', trigger: 'blur'},

                    ],
                    code: [
                        {required: true, message: '请输入厂商编码', trigger: 'blur'},

                    ],
                    address: [
                        {required: true, message: '请选择收货城市', trigger: 'blur'}
                    ],
                    phoneNumber: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'}
                    ],
                    contact: [
                        {required: true, message: '联系人不能为空', trigger: 'blur'}
                    ],
                    detailedAddress: [
                        {required: true, message: '工厂地址不能为空', trigger: 'blur'}
                    ],
                    technologys: [
                        {required: true, message: '工艺不能为空', trigger: 'blur'}
                    ]
                },
                option: regionData,//城市选择
                address: [],//地址
                upaddress: [],//修改地址
                upfactoryForm: {
                    //修改厂商信息表单数据
                    name: '',//名称
                    code: '',//编码
                    company: '',//所属公司
                    address: '',//地址
                    detailedAddress: '',//详细地址信息
                    contact: '',//联系人
                    phoneNumber: '',//手机号码
                    technologys: [],//工艺职能
                    remark: '',//备注信息

                },
                upfactorysrules: {
                    //新建厂商信息表单验证
                    name: [
                        {required: true, message: '请输入厂商名称', trigger: 'blur'},

                    ],
                    code: [
                        {required: true, message: '请输入厂商编码', trigger: 'blur'},

                    ],
                    phoneNumber: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'}
                    ],
                    contact: [
                        {required: true, message: '联系人不能为空', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请选择收货城市', trigger: 'blur'}
                    ],
                    detailedAddress: [
                        {required: true, message: '工厂地址不能为空', trigger: 'blur'}
                    ],
                    technologys: [
                        {required: true, message: '工艺不能为空', trigger: 'blur'}
                    ]
                },
                /**
                 * 显示设置
                 * **/
                nameShow: true,//名称
                codeShow: true,//编码
                functionShow: true,//工厂职能
                addressShow: true,//城市
                detailedAddressShow: true,//详细地址
                companyShow: true,//所属公司
                contactShow: true,//联系人
                phoneNumberShow: true,//手机号码
                createTimeShow: true,//创建时间
                updateTimeShow: true,//修改时间
                remarkShow: true,//备注

                queryspare01: '',//查询其他
                queryname: '',//查询名称
                querycompany: '',//查询所属公司
                typedata: '',//用于储存数据，当表单发生改变时校验

            }
        },
        mounted() {

            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
        },
        watch: {
            screenWidth(val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        that.size()
                        that.timer = false
                        console.log(1)
                    }, 400)
                }
            }
        },
        methods: {
            size(){
                //监听窗口函数
                setTimeout(() => {
                    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 150;
                }, 100)
            },
            closeFun() {
                let obj = JSON.stringify(this.upfactoryForm)
                let state = (obj == this.typedata)
                let that = this
                if (!state) {
                    this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '保存',
                        cancelButtonText: '放弃修改'
                    })
                        .then(() => {
                            that.upsubmitForm('upfactoryForm')
                        })

                }

            },
            handleChange(value) {
                //城市选择
                console.log(value)
                this.addfactoryForm.address = ''
                this.addfactoryForm.address += `${CodeToText[value[0]]}-${CodeToText[value[1]]}-${CodeToText[value[2]]}`

                this.upfactoryForm.address = ''
                this.upfactoryForm.address += `${CodeToText[value[0]]}-${CodeToText[value[1]]}-${CodeToText[value[2]]}`
            },
            submitForm(addfactoryForm) {
                //新建厂商信息
                let that = this
                this.$refs[addfactoryForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.addfactory, this.addfactoryForm).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success',
                                });
                                this.factoryquery();
                                this.addfactory = false
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    } else {
                        this.$message({
                            message: '信息填写不完全',
                            type: 'warning'
                        });
                    }
                });
            },
            upsubmitForm(upfactoryForm) {
                this.typedata = JSON.stringify(this.upfactoryForm)
                //修改厂商信息
                this.$refs[upfactoryForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.upfactory, this.upfactoryForm).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',

                                });
                                this.factoryquery()
                                this.upfactory = false
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    } else {
                        this.$message({
                            message: '信息填写不完全',
                            type: 'warning'
                        });
                    }
                });
            },
            upfactoryspanel(data) {
                console.log(data)
                //打开修改信息面板
                this.upfactory = true
                this.upfactoryForm = data
                this.upaddress.length = 0
                // TextToCode

                let cti = data.address.split('-')
                let county = TextToCode[cti[0]][cti[1]][cti[2]].code //县市
                let provinces = `${county.substring(0, 3)}000`   //省份
                let city = `${county.substring(0, 4)}00`      //辖区
                this.upaddress.splice(0, 0, provinces)
                this.upaddress.splice(1, 0, city)
                this.upaddress.splice(2, 0, county)

                this.typedata = JSON.stringify(data) //将数据转为字符串，进行修改验证

            },
            delfactoryspanel(val) {
                //删除单条工厂信息
                this.factoryIds.length = 0
                this.factoryIds.push(val.id)
                this.delfactory()
            },
            delfactory() {
                //删除工厂信息
                this.$axios.post(this.$store.state.delfactory, {ids: this.factoryIds}).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success',

                        });
                        this.factoryquery()
                    }
                    else {
                        this.$message.error('删除失败！');
                    }
                })
            },
            factorylistpag(val) {
                //工厂信息分页
                this.pageNumFactory = val
                this.factoryquery()
            },
            factorySelection(val) {
                //工厂信息多选
                this.factoryIds.length = 0

                let listdata = [];//保存选中数据，判断是否允许删除

                val.forEach(item => {
                    this.factoryIds.push(item.id)
                    listdata.push(item.recordState)
                })
                let HideShow = listdata.indexOf('rs01')
                if (val.length == 0 || HideShow != -1) {
                    this.delStatusButGoods = true
                } else {
                    this.delStatusButGoods = false
                }
            },
            factoryquery() {
                //工厂信息分页查询
                this.$axios.get(this.$store.state.factoryPage, {
                    params: {
                        pageSize: this.pageSizeFactory, pageNum: this.pageNumFactory,
                        company: this.querycompany, name: this.queryname, spare01: this.queryspare01
                    }
                }).then(res => {
                    this.factoryList = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                })
            }
        },
        created: function () {
            this.factoryquery()
            this.size()
        }

    }
</script>

<style scoped>
    .factory {
        width: 100%;
        height: 100%;
        /*padding: 1%;*/
        /*display: flex;*/
        /*justify-content: space-around;*/

    }

</style>