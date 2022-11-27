<template>
    <div class="personal-cases">
        <NavBar title="患者病历" />
        <van-tabs v-model="active">
            <van-tab title="医生诊断">
                <div class="add-btn">
                    <van-button
                        round
                        type="info"
                        :to="`/doctor/add-diagnostics?pId=${pId}`"
                        >添加诊断</van-button
                    >
                    <van-button round type="info" @click="delShow = !delShow">{{
                        delShow ? '取消删除' : '删除诊断'
                    }}</van-button>
                </div>
                <div
                    class="doc-diagnosis-list-box"
                    v-if="docDiagnosisList.length"
                >
                    <div v-for="(item, index) in docDiagnosisList" :key="index">
                        <div class="diagnosis-cont">
                            <div class="diagnosis-text">
                                <span>{{
                                    `${index + 1}. ${item.diagnostica}`
                                }}</span>
                                <van-icon
                                    @click="delDiagnostics(item)"
                                    v-if="delShow"
                                    name="delete-o"
                                />
                            </div>
                            <div class="diagnosis-time">
                                <span
                                    >{{
                                        item.doctorType === 'Doc'
                                            ? '全科医生'
                                            : '上级医生'
                                    }}：{{ item.doctorName }}</span
                                >
                                <span>{{ item.createTime.slice(0, 10) }}</span>
                            </div>
                            <van-divider />
                        </div>
                    </div>
                </div>
                <van-empty v-else description="暂无记录" />
            </van-tab>
            <van-tab title="健康档案">
                <div v-if="!isEdit">
                    <van-cell-group title="健康档案">
                        <van-cell
                            title="既往疾病史"
                            :label="healthCondition.jiWangJiBingShi"
                            size="large"
                        />
                        <van-cell
                            title="服药情况史"
                            :label="healthCondition.fuYaoQingKuangShi"
                            size="large"
                        />
                        <van-cell
                            title="外伤及手术史"
                            :label="healthCondition.waiShangJiShouShuShi"
                            size="large"
                        />
                        <van-cell
                            title="家族史"
                            :label="healthCondition.jiaZuShi"
                            size="large"
                        />
                    </van-cell-group>
                    <van-cell-group title="生活习惯">
                        <van-cell
                            title="嗜烟史"
                            :label="healthCondition.shiYanShi"
                            size="large"
                        />
                        <van-cell
                            title="嗜酒史"
                            :label="healthCondition.shiJiuShi"
                            size="large"
                        />
                        <van-cell
                            title="生活规律"
                            :label="healthCondition.shengHuoGuilv"
                            size="large"
                        />
                    </van-cell-group>
                    <div class="footer">
                        <div>录入医生:{{ healthCondition.docName }}</div>
                        <div>更新时间:{{ healthCondition.updateTime }}</div>
                        <div class="btn-group">
                            <van-button type="info" round @click="isEdit = true"
                                >修改病历</van-button
                            >
                        </div>
                    </div>
                </div>
                <div v-else>
                    <van-cell-group title="健康档案">
                        <van-field
                            label="既往疾病史"
                            v-model="healthCondition.jiWangJiBingShi"
                            size="large"
                            placeholder="请输入内容"
                        />
                        <van-field
                            label="服药情况史"
                            v-model="healthCondition.fuYaoQingKuangShi"
                            placeholder="请输入内容"
                            size="large"
                        />
                        <van-field
                            label="外伤及手术史"
                            v-model="healthCondition.waiShangJiShouShuShi"
                            placeholder="请输入内容"
                            size="large"
                        />
                        <van-field
                            label="家族史"
                            v-model="healthCondition.jiaZuShi"
                            placeholder="请输入内容"
                            size="large"
                        />
                    </van-cell-group>
                    <van-cell-group title="生活习惯">
                        <van-field
                            label="嗜烟史"
                            v-model="healthCondition.shiYanShi"
                            placeholder="请输入内容"
                            size="large"
                        />
                        <van-field
                            label="嗜酒史"
                            v-model="healthCondition.shiJiuShi"
                            placeholder="请输入内容"
                            size="large"
                        />
                        <van-field
                            label="生活规律"
                            v-model="healthCondition.shengHuoGuilv"
                            placeholder="请输入内容"
                            size="large"
                        />
                    </van-cell-group>
                    <div class="btn-group2">
                        <van-button type="info" @click="submit" round
                            >提交</van-button
                        >
                    </div>
                </div>
            </van-tab>
            <van-tab title="就诊记录">
                <div class="add-btn">
                    <van-button
                        round
                        type="info"
                        :to="`/doctor/add-record?pId=${pId}`"
                        >添加就诊记录</van-button
                    >
                </div>
                <div v-if="diagnosisRecord.length">
                    <div v-for="(item, index) in diagnosisRecord" :key="index">
                        <van-cell-group>
                            <van-cell
                                title="门诊诊断"
                                :label="item.zhenDuan"
                                size="large"
                            />
                            <van-cell
                                title="病情分析"
                                :label="item.bingQingFenXi"
                                size="large"
                            />
                            <van-cell
                                title="处置"
                                :label="item.chuZhi"
                                size="large"
                            />
                            <van-cell
                                title="就诊时间"
                                :label="item.diagnoseTime"
                                size="large"
                            />
                        </van-cell-group>
                        <div class="footer">
                            <div>医生：{{ item.docName }}</div>
                            <div>录入时间:{{ item.createTime }}</div>
                        </div>
                    </div>
                </div>
                <van-empty v-else description="暂无记录" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
// 个人病例
import {
    Button,
    Cell,
    CellGroup,
    Toast,
    Tab,
    Tabs,
    Field,
    Empty,
    Divider,
    Dialog,
    Icon,
} from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            delShow: false,
            isEdit: false,
            active: 0,
            pId: null,
            dId: null,
            diagnosisRecord: [],
            healthCondition: {},
            docDiagnosisList: [],
        };
    },
    computed: {},
    mounted() {
        this.pId = this.$route.query.pId;
        this.dId = sessionStorage.getItem('DID');
        this.getDocDiagnosis();
        this.getInfo();
    },
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Tabs.name]: Tabs,
        [Tab.name]: Tab,
        [Field.name]: Field,
        [Empty.name]: Empty,
        [Divider.name]: Divider,
        [Icon.name]: Icon,
        NavBar,
    },
    methods: {
        getInfo() {
            this.$api
                .get(`/qkys/api/doc/getPatientHealthRecordByPId/${this.pId}`)
                .then(res => {
                    const { data } = res;
                    this.healthCondition = data.healthCondition || {};
                    this.diagnosisRecord = data.diagnosisRecord;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        submit() {
            this.$api
                .post(`/qkys/api/doc/updatePatientHealthCondition`, {
                    pId: this.pId,
                    dId: this.dId,
                    ...this.healthCondition,
                })
                .then(res => {
                    Toast('修改成功');
                    this.isEdit = false;
                    this.getInfo();
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        getDocDiagnosis() {
            this.$api
                .get(`/qkys/api/doc/getDiagnosticaByPId/${this.pId}`)
                .then(res => {
                    const { data } = res;
                    this.docDiagnosisList = data || [];
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        delDiagnostics(data) {
            Dialog.confirm({
                title: '删除诊断',
                message: '确认删除该条诊断？',
            })
                .then(() => {
                    this.$api
                        .get(`/qkys/api/doc/deleteDiagnosticaById/${data.id}`)
                        .then(() => {
                            this.docDiagnosisList = this.docDiagnosisList.filter(
                                item => item.id !== data.id
                            );
                        })
                        .catch(e => {
                            Toast(e.errMsg);
                        });
                })
                .catch(() => {
                    Toast('取消删除');
                });
        },
    },
};
</script>

<style lang="less" scoped>
.personal-cases {
    background: #f8f8f8;
    .doc-diagnosis-list-box {
        background: #fff;
    }
    .diagnosis-cont {
        padding: 10px 10px 0 10px;
        .diagnosis-text {
            font-size: 20px;
        }
        .diagnosis-time {
            text-align: right;
            opacity: 0.7;
            span {
                margin-left: 10px;
            }
        }
    }
    .footer {
        background: #fff;
        padding: 12px;
        margin: 20px 0;
        text-align: right;
    }
    .add-btn {
        margin: 10px;
        text-align: right;
        .van-button {
            margin-left: 10px;
        }
    }
    .btn-group {
        padding: 15px 0;
        text-align: right;
    }
    .btn-group2 {
        padding: 15px 12px;
        text-align: right;
    }
}
</style>
