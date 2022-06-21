import React, { useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import {DownOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './menu.less'

const SideMenu = (props) => {
  // 目前仅支持hover
  const { routes, trigger = 'hover' } = props
  // 两种菜单模式
  const [fold, setFold] = useState(false)
  // 获取当前激活的菜单项下的子菜单
  const [activeItem, setActiveItem] = useState([])
  // 配置样式
  const [style, setStyle] = useState({})

  return (
    <section className={classNames('y-side-menu', { fold })}>
      <div className='y-side-menu-head'>
        {/* 随便放点图 */}
        {/* <img src={} width='28' height='28' style={{ marginBottom: 12 }}/> */}
        {/* <img src={} height='14'/> */}
        <button className='y-side-menu-fold-button' onClick={() => {console.log(fold);setFold(!fold)}}><DownOutlined/></button>
      </div>
      <hr className='y-side-menu-div'/>
      <div className='y-side-menu-content'>
        {routes.map((item,idx) => <Menu item={item} fold={fold} key={idx} setActiveItem={setActiveItem} setStyle={setStyle}/>)}
        {fold && <BesideMenu itemList={activeItem} style={style}/>}
      </div>
    </section>
  )
}

const Menu = (props) => {
  const { item, fold, setActiveItem, setStyle } = props
  const { icon, label, value, children, query } = item
  const [spread, setSpread] = useState(true)
  const [activeMenu, setActiveMenu] = useState(false)
  const menuRef = useRef()
  useEffect(() => {
    if (fold) {
      setSpread(false)
    } else {
      setSpread(true)
    }
  }, [fold])
  const onMenuActive = () => {
    const container = document.querySelector('.y-side-menu-content')
    const containerTop = container.getBoundingClientRect().top
    const menuTop = menuRef.current.getBoundingClientRect().top
    setStyle({ top: `${menuTop - containerTop }px`, transition: '.2s' })
    setActiveMenu(true)
    setActiveItem(children)
  }
  const onMenuDeactive = () => {
    setActiveMenu(false)
    setStyle(style => ({ ...style, transform: 'scale(0)', transition: '.2s 1s' }))
  }
  const active = !item.query ? item?.value === window?.location?.pathname : (item?.value === window?.location?.pathname && item.query === window.location?.search)
  if (!children?.length) {
    return <Link to={`${value}${query ?? ''}`}>
      <div className={classNames('y-side-menu-item')}>
        {icon && <img src={icon} className='y-side-menu-item-icon'/>}
        {!fold && <div className={classNames('y-side-menu-item-label', { active })}>{label}</div>}
      </div></Link>
  }
  return <div>
    <div className={classNames('y-side-menu-item-father', 'y-side-menu-item', { activeMenu })}
      onClick={() => !fold && setSpread(!spread)}
      onMouseOver={onMenuActive}
      onMouseOut={onMenuDeactive}
      ref={menuRef}
    >
      {icon && <img src={icon} className='y-side-menu-item-icon'/>}
      {!fold && <span className='y-side-menu-item-label'>{label}</span>}
      {!fold && <DownOutlined className={classNames('y-side-menu-fold-arrow', { rotate: !spread })}/>}
    </div>
    {<div className={classNames('y-side-menu-item-children', { fold: !spread })} style={{ height: `${!spread ? 0 : 62 * children.length}px`, transition: 'height .3s' }}>
      {children.map((i,idx) => <MenuItem item={i} key={idx}/>)}
    </div>}
  </div>
}

const MenuItem = ({ item }) => {
  const { label, value, query } = item
  const active = !item.query ? item?.value === window?.location?.pathname : (item?.value === window?.location?.pathname && item.query === window.location?.search)
  return <Link to={`${value}${query ?? ''}`}>
    <div className='y-side-menu-item'>
      <div className={classNames('y-side-menu-item-label', { active })}>{label}</div>
    </div>
  </Link>
}
const BesideMenu = ({ itemList, style }) => {
  const [hover, setHover] = useState(false)
  return <div className='y-side-menu-beside-menu' style={hover ? { ...style, transition: 'none', transform: 'scale(1)' } : style} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
    {itemList.map((item) => {
      const { label, value, query } = item
      const active = !item.query ? item?.value === window?.location?.pathname : (item?.value === window?.location?.pathname && item.query === window.location?.search)
      return <Link to={`${value}${query ?? ''}`}>
        <div className='y-side-menu-beside-menu-item'>
          <div className={classNames('y-side-menu-beside-menu-label', { active })}>{label}</div>
        </div>
      </Link> 
    })}
  </div>
}

export default SideMenu