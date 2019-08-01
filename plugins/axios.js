import { Message } from 'element-ui'

export default function({ $axios, redirect }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    } else if (code === 401) {
      Message.error('没有权限，需要登录！')
      redirect('/login')
    }
  })
}
