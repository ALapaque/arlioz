import appData from '@/data/app-data'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: inline-flex;
  gap: 1rem;
  align-items: center;
`

const CompanyNameWrapper = styled.h1`
  font-size: 1.5em;
  transition: all 0.5s ease-in-out;
  padding: 0;
  margin: 0;
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
