import appData from '@/data/app-data'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: inline-flex;
  gap: .5rem;
  align-items: center;
`

const CompanyNameWrapper = styled.h1`
  transition: all 0.5s ease-in-out;
  padding: 0;
  margin: 0;
  font-family: "Caveat", cursive;
  font-size: 2.5rem;
`

const LogoWrapper = styled.img`
  height: 50px;
  width: 50px;
`

export default function Logo() {
  return (
    <Wrapper>
      <LogoWrapper src={appData.company.logo}/>
      <CompanyNameWrapper className={'logo'}>{appData.company.name}</CompanyNameWrapper>
    </Wrapper>
  )
}
