<template>
    <div class="personal-cases">
        <NavBar title="个人病例" />
        <van-tabs v-model="active">
            <van-tab title="健康情况">
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
import { Button, Cell, CellGroup, Toast, Tab, Tabs } from 'vant';
import NavBar from '@/components/NavBar.vue';
import { getPId } from '@/common/util.js';

export default {
    data() {
        return {
            active: 0,
            pId: null,
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
    },
};
</script>

<style lang="less" scoped>
.personal-cases {
    background: #f8f8f8;
    .footer {
        background: #fff;
        padding: 0 10px 0 0;
        margin: 0 0 20px 0;
        text-align: right;
    }
}
</style>
