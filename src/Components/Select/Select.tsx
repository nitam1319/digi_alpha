// @ts-nocheck
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Select.css'

export default function Select ({
  list,
  setList
}: {
  list: string[]
  setList: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false)
  const [position, setPosition] = useState<{
    x: string | number
    y: string | number
  }>({ x: 0, y: 0 })
  const [inputValue, setInputValue] = useState('')
  const [listDropDown, setListDropDown] = useState<string[]>([
    'Ali',
    'Matin',
    'Sara',
    'Tina',
    'Mohamad',
    'Amin'
  ])
  const ref: React.LegacyRef<HTMLDivElement> = useRef(null)
  function addListDropDownFC (item: string) {
    const copy = [...list]
    copy.push(item)
    setList(copy)
  }

  function addListDropDown (listItem: string) {
    const hasProperty = list.find(item => item === listItem)
    if (!hasProperty) {
      addListDropDownFC(listItem)
    }
  }

  function changeInputValue (e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function addItem () {
    if (inputValue.trim()) {
      const hasPropertyList = list.findIndex(item => item === inputValue.trim())
      const hasPropertyListDropDown = listDropDown.findIndex(
        item => item === inputValue.trim()
      )
      if (hasPropertyListDropDown === -1) {
        const copy = [...listDropDown]
        copy.push(inputValue)
        setListDropDown(copy)
      }
      if (hasPropertyList === -1) {
        addListDropDownFC(inputValue)
        setInputValue('')
      }
    }
  }

  function sortFC (a: string, b: string) {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  }

  function search () {
    const findItems = listDropDown.filter(item =>
      item.toLowerCase().includes(inputValue.trim().toLowerCase())
    )
    const sortItems = findItems.sort(sortFC)
    return(<>
     { !sortItems.length&&<div className='p'><p>Not find</p></div>}
     { sortItems.map((item, index) => (
      <div
        key={index}
        onClick={() => {
          addListDropDown(item)
        }}
      >
        <span>{item}</span>
      </div>
    ))}
    </>)
  }

  useEffect(() => {
    let height = window.innerHeight
    console.log(ref)
    let { offsetTop }: any = ref.current

    if (height - offsetTop <= 400) {
      setPosition({
        x: -10,
        y: -200
      })
    } else {
      setPosition({
        x: -10,
        y: 200
      })
    }
  }, [list])

  return (
    <>
      <div className='input_div' ref={ref}>
        <input
          type='text'
          onChange={e => {
            changeInputValue(e)
          }}
          value={inputValue}
          onKeyDown={e => {
            e.key === 'Enter' && addItem()
          }}
          onFocus={e => {
            setIsOpenDropDown(true)
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsOpenDropDown(false)
            }, 100)
          }}
        />
        <div className='tick' onClick={addItem}>
          <img src='tick.svg' alt='' />
        </div>
        {isOpenDropDown && (
          <div
            className={`dropDown`}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`
            }}
          >
            {search()}
          </div>
        )}
      </div>
    </>
  )
}
