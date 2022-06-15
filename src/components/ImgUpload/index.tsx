import { defineComponent, PropType, reactive } from 'vue'
import { Upload } from 'ant-design-vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import styles from './index.module.less'
import { VcFile } from 'ant-design-vue/lib/upload/interface'
import wxRequest from '@/utils/wxRequest'

const PropsDefine = {
  fileID: {
    type: String as PropType<string>,
  },
  imageUrl: {
    type: String as PropType<string>,
  },
  relativePath: {
    type: String as PropType<string>,
    required: true,
  },
} as const

/** 图片上传 */
export default defineComponent({
  name: 'DataSourceTree',
  props: PropsDefine,
  emits: ['update:fileID', 'update:imageUrl'],
  setup(props, { emit }) {
    const state = reactive({
      loading: false,
    })

    const handleUpload = (uploadParams: { file: VcFile }) => {
      return new Promise((resolve, reject) => {
        state.loading = true
        wxRequest
          .uploadFile({
            cloudPath: `${
              props.relativePath
            }/${new Date().getTime()}_${encodeURI(uploadParams.file.name)}`,
            file: uploadParams.file,
          })
          .then(resFile => {
            const fileID = resFile.fileID
            const oldFileID = props.fileID
            emit('update:fileID', fileID)
            wxRequest
              .getTempFileURL({
                fileList: [fileID],
              })
              .then(res => {
                state.loading = false
                const imageUrl = res.fileList[0].tempFileURL
                emit('update:imageUrl', imageUrl)
                if (oldFileID) {
                  wxRequest.deleteFile({
                    fileList: [oldFileID],
                  })
                }
                resolve(imageUrl)
              })
              .catch(err => {
                state.loading = false
                reject(err)
              })
          })
          .catch(err => {
            state.loading = false
            reject(err)
          })
      })
    }

    return () => (
      <Upload
        accept="image/*"
        showUploadList={false}
        listType="picture-card"
        customRequest={handleUpload}
      >
        <div class={styles.uploaded_warpper}>
          {props.imageUrl ? (
            <img class={styles.uploaded_img} src={props.imageUrl} />
          ) : (
            <div class={styles.avatar_uploader}>
              {state.loading ? (
                <LoadingOutlined
                  style={{ fontSize: '36px', color: '#999' }}
                ></LoadingOutlined>
              ) : (
                <PlusOutlined
                  style={{ fontSize: '36px', color: '#999' }}
                ></PlusOutlined>
              )}
              <div class={styles.upload_text}>Upload</div>
            </div>
          )}
        </div>
      </Upload>
    )
  },
})
