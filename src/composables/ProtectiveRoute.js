import { useRouter } from "vue-router"
import Cookies from "js-cookie"
export default function useprotect (){
    let users = Cookies.get("fmljwt")
    const router = useRouter()

    const protectiveFun = () => {
        if (!users) {
            router.push('/')
        }
    }

    const NonprotectiveFun = () => {
        if (users) {
            router.push('/home')
        }
    }

    return {
        protectiveFun,
        NonprotectiveFun
      };
}
