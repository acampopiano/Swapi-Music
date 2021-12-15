import styled from '@emotion/styled'

export const UserHeaderStyle = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /* width: ${({ width }: { width?: string }) =>
        width ? width : '755px'}; */
    /* justify-content: space-between; */
    aside {
        margin: 0 0 0 20px;
    }
`

export const UserBody = styled.main`
    margin: 65px 0 110px 270px;
`

export const UserProfile = styled.p`
    font-weight: bold;
    font-size: 14px;
    margin: 0%;
`

export const UserName = styled.h1`
    font-size: 5rem;
    margin: 0;
`
export const UserFooter = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 200px;
    p {
        font-weight: 600;
    }
`
export const UserFooterButton = styled.a`
    margin: 0%;
    font-weight: 600;
    &:hover {
        text-decoration: underline;
    }
`
