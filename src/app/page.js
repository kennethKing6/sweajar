"use client"

import Button from "./components/Button";
import UsersList from "./components/UsersList";
import DropdownMenu from "./components/DropDownMenu"

export default function Home() {
  return (
   <>
    <UsersList/>
   <div>
    <DropdownMenu></DropdownMenu>
   </div>
   </>
  )
}
