import styled from 'react-emotion'

export default styled('nav')(({ options: o }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',

  '.lvl1-wrapper': {
    '> a, > button': {
      fontSize: 16,
      padding: `${o.ySpacing}px ${o.xSpacing}px`,

      '&, &:hover, &:focus': {
        textDecoration: 'none',
      },
    },

    'a.item-has-children': {
      paddingRight: 0,

      '+ button svg': {},
    },
  },

  button: {
    border: 'none',
    cursor: 'pointer',
    background: 'rgba(0,0,0,0)',

    '&.button-has-icon': {
      display: 'flex',
      alignItems: 'center',

      svg: {
        paddingLeft: o.xSpacing,
      },
    },

    '&:focus': {
      outline: 'none',
    },
  },

  '.subitem': {
    position: 'absolute',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    width: 'calc(100% - 60px)',
    left: 0,
    right: 0,
    margin: 'auto',
    padding: `${o.ySpacing}px ${o.ySpacing * 2}px 0`,
  },

  '.subitem-inner': {
    display: 'flex',
    flexWrap: 'wrap',
  },

  '.subitem-section': {
    display: 'flex',
    flexDirection: 'column',
    padding: `0 ${o.xSpacing}px ${o.ySpacing}px`,
    textAlign: 'left',

    ul: {
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      fontSize: 16,
    },
  },

  '.section-title': {
    fontSize: 18,
    marginBottom: o.ySpacing,
  },

  ...o.styles,
}))
