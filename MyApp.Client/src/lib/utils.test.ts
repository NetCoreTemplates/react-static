import { describe, expect, it } from 'vite-plus/test'
import { cn } from './utils'
import { getRedirect, isServerRoute } from './gateway'

describe('cn', () => {
    it('merges conflicting tailwind classes', () => {
        expect(cn('p-2 text-sm', 'p-4')).toBe('text-sm p-4')
    })

    it('ignores falsy values', () => {
        expect(cn('a', false, null, undefined, 'c')).toBe('a c')
    })
})

describe('gateway', () => {
    it('detects server routes', () => {
        expect(isServerRoute('/Identity/Account/Login')).toBe(true)
        expect(isServerRoute('/profile')).toBe(false)
    })

    it('reads redirect from search params', () => {
        expect(getRedirect(new URLSearchParams('redirect=/profile'))).toBe('/profile')
        expect(getRedirect(new URLSearchParams())).toBeNull()
    })
})
