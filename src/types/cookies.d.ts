import { type COOKIES_KEYS } from '@/constants/cookiesKeys'

export type Cookies = typeof COOKIES_KEYS[keyof typeof COOKIES_KEYS]

export type CookiesObj = { [key in Cookies]?: string }
