import styled from '@emotion/styled'
import link from 'next/link'
import { colors } from '../../../../colors'
import { fontWeight } from '../../../../fonts'

export const ItemBox = styled.div`
    display: flex;
    align-items: center;
    h1 {
    }
`

export const ItemT = styled.a`
    h1 {
        margin: 0.75em;
        font-size: 22px;
        color: ${colors.blue};
        font-weight: ${fontWeight.semiBold};
        cursor: pointer;
    }
`
