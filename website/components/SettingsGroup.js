import React from 'react'
import { Box, styled } from '@smooth-ui/core-sc'
import ChevronLeft from 'components/icons/ChevronLeft'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #181a1e;
`

const Title = styled.button`
  display: block;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 15px;
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  transition: background-color 300ms;
  line-height: 20px;
  border-bottom: 1px solid #181a1e;

  &:focus,
  &:hover {
    background-color: #292d36;
    outline: none;
  }
`
const Content = styled.div`
  padding: 0 0 20px;
  border-bottom: 1px solid #181a1e;
`

const Marker = styled(ChevronLeft)`
  width: 18px;
  height: 18px;
  transition: transform 300ms;
  transform: rotate(0);

  &.opened {
    transform: rotate(-90deg);
  }
`

class SettingGroup extends React.Component {
  state = { opened: true }

  handleClick = () => this.setState(state => ({ opened: !state.opened }))

  render() {
    const { title, children } = this.props
    return (
      <Container>
        <Title onClick={this.handleClick}>
          <Box textAlign="left" display="flex" alignItems="center">
            <Box flex={1}>{title}</Box>
            <Marker className={this.state.opened ? 'opened' : ''} />
          </Box>
        </Title>
        {this.state.opened && <Content>{children}</Content>}
      </Container>
    )
  }
}

export default SettingGroup
