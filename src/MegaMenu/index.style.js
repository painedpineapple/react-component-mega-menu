import styled from 'react-emotion'

export default styled('nav')(({ options: o }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',

  '.lvl1-wrapper': {
    '> a, > button': {
      fontSize: 16,
      padding: 15,

      '&, &:hover, &:focus': {
        textDecoration: 'none',
      },
    },

    'a.item-has-children': {
      paddingRight: 0,
    },
  },

  button: {
    border: 'none',
    cursor: 'pointer',
    background: 'rgba(0,0,0,0)',

    '&:focus': {
      outline: 'none',
    },
  },

  '.subitem': {
    position: 'absolute',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    width: 'calc(100% - 2px)',
    left: 0,
    right: 0,
    margin: 'auto',
  },

  ...o.styles,
}))
