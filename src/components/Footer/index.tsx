import { defineComponent } from 'vue'
import styles from './index.module.less'

export default defineComponent(function Footer() {
  return () => (
    <div class={styles.footer_warper}>
      <div class={styles.footer_warper_area}></div>
      <div class={styles.footer}>
        <div class={styles.copyright}>
          2020-2021 &copy; 中信银行版权版权所有。 Copyright &copy; 2019 CHINA
          CITIC BANK ALL Rights Reserved
        </div>
      </div>
    </div>
  )
})
