<template>
    <div class="personal-cases">
        <NavBar title="个人病例" />
        <van-tabs v-model="active">
            <van-tab title="健康情况">
                <div v-if="!isEdit">
                    <van-cell-group title="健康情况">
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
                            <van-button type="info" @click="isEdit = true" round
                                >修改病历</van-button
                            >
                        </div>
                    </div>
                </div>
                <div v-else>
                    <van-cell-group title="健康情况">
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
                <div v-for="(item, index) in diagnosisRecord" :key="index">
                    <van-cell-group>
                        <van-cell
                            title="就诊时间"
                            :label="item.diagnoseTime"
                            size="large"
                        />
                        <van-cell
                            title="主诉"
                            :label="item.zhuSu"
                            size="large"
                        />
                        <van-cell
                            title="现病史"
                            :label="item.xianbingshi"
                            size="large"
                        />
                        <van-cell
                            title="查体及辅助检查"
                            :label="item.chaTi"
                            size="large"
                        />
                        <van-cell
                            title="处置"
                            :label="item.chuZhi"
                            size="large"
                        />
                        <van-cell
                            title="门诊诊断"
                            :label="item.zhenDuan"
                            size="large"
                        />
                    </van-cell-group>
                    <div class="footer">
                        <div>医师:{{ item.docName }}</div>
                        <div>录入时间:{{ item.createTime }}</div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
// 个人病例
import { Button, Cell, CellGroup, Toast, Tab, Tabs, Field } from 'vant';
import NavBar from '@/components/NavBar.vue';
import { getPId } from '@/common/util.js';

export default {
    data() {
        return {
            active: 0,
            pId: null,
            isEdit: false,
            diagnosisRecord: [],
            healthCondition: {},
        };
    },
    computed: {},
    mounted() {
        this.pId = getPId();
        this.getInfo();
    },
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Tabs.name]: Tabs,
        [Tab.name]: Tab,
        [Field.name]: Field,
        NavBar,
    },
    methods: {
        getInfo() {
            this.$api
                .get(`/qkys/api/getPatientHealthRecordByPId/${this.pId}`)
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
                .post(`/qkys/api/updatePatientHealthCondition`, {
                    pId: this.pId,
                    dId: 0,
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
    },
};
</script>

<style lang="less" scoped>
.personal-cases {
    background: #f8f8f8;
    .footer {
        background: #fff;
        padding: 12px 12px 0 0;
        margin: 20px 0;
        text-align: right;
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
