<template>
    <div class="add-calendar">
        <NavBar />
        <div class="chose-upload-type">
            <van-field
                readonly
                clickable
                label="上传类型"
                :value="calendarType"
                placeholder="请选择上传的类型"
                @click="choseTypePicker = true"
            />
            <van-popup v-model="choseTypePicker" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="calendarTypeList"
                    @cancel="choseTypePicker = false"
                    @confirm="confirmType"
                />
            </van-popup>
        </div>
        <div v-if="calendarType === '血糖'" class="calendar-type">
            <div class="chose-item">
                <span class="item-name">早餐前</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item">
                <span class="item-name">早餐后</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item">
                <span class="item-name">午餐前</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item">
                <span class="item-name">午餐后</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item">
                <span class="item-name">晚餐前</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item">
                <span class="item-name">晚餐后</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item">
                <span class="item-name">睡觉前</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
        </div>
        <div v-else-if="calendarType === '血压'" class="calendar-type">
            <div class="chose-item row">
                <span class="item-name">早晨</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item row">
                <span class="item-name">中午</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item row">
                <span class="item-name">晚间</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
        </div>
        <div v-else-if="calendarType === '运动/饮食'" class="calendar-type">
            <div>运动</div>
            <div class="chose-item row">
                <span class="item-name">早晨</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item row">
                <span class="item-name">中午</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item row">
                <span class="item-name">晚间</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div>饮食</div>
            <div class="chose-item row">
                <span class="item-name">早晨</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item row">
                <span class="item-name">中午</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item row">
                <span class="item-name">晚间</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
        </div>
        <div v-else-if="calendarType === '辅助检查'" class="calendar-type">
            <div class="chose-item row">
                <span class="item-name">早晨</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item row">
                <span class="item-name">中午</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
            <div class="chose-item row">
                <span class="item-name">晚间</span>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    accept="image/*"
                    max-count="1"
                    :max-size="500 * 1024"
                    @oversize="onOversize"
                />
            </div>
        </div>
        <div v-if="calendarType" class="btn-group">
            <van-button
                type="info"
                @click="uploadCalendar"
                :loading="loading"
                loading-text="上传中..."
                >上传</van-button
            >
        </div>
    </div>
</template>

<script>
// TODO:
import {
    Button,
    Cell,
    CellGroup,
    Picker,
    Field,
    Popup,
    Uploader,
    Toast,
} from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            loading: false,
            choseTypePicker: false,
            calendarType: '',
            calendarTypeList: ['血糖', '血压', '运动/饮食', '辅助检查'],
            fileList: [],
        };
    },
    computed: {},
    mounted() {},
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Picker.name]: Picker,
        [Field.name]: Field,
        [Popup.name]: Popup,
        [Uploader.name]: Uploader,
        NavBar,
        // [Icon.name]: Icon,
    },
    methods: {
        onOversize(file) {
            console.log(file);
            Toast('文件大小不能超过 500kb');
        },
        afterRead(file, detail) {
            //文件读取完成后的回调函数
            console.log(this.fileList);
        },
        beforeRead(file, detail) {
            // TODO: 图片压缩, 文件读取前的回调函数，返回 false 可终止文件读取
            return true;
        },
        confirmType(value) {
            this.calendarType = value;
            this.choseTypePicker = false;
        },
        uploadCalendar() {
            console.log('上传');
            this.loading = true;
            this.$api.post('/qkys/api/', {}).then(res => {
                console.log(res);
                Toast('上传成功');
                this.loading = false;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.add-calendar {
    .calendar-type {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 10px 15px;
        .chose-item {
            display: flex;
            flex: 1 1 50%;
            margin: 5px 0;
            .item-name {
                margin: 0 10px 0 0;
            }
        }
        .row {
            flex: 1 1 100%;
        }
    }
    .btn-group {
        margin: 20px 15px 0 0;
        text-align: right;
    }
}
</style>
