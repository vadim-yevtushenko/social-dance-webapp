import {Fragment} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {classNamesJoin} from "../../../util/classNameUtils";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {dancerLogout} from "../../../redux/actions/authActions";
import {getOrganizedEvent} from "../../../redux/actions/eventActions";
import {getAdministratedSchool} from "../../../redux/actions/schoolActions";
import {loadingRequest} from "../../../redux/actions/requestActions";
import {successHandling} from "../../../api/notificationHandling";

const navigation = [
  { name: 'Events', href: '/events' },
  { name: 'Schools', href: '/schools' },
  { name: 'Dancers', href: '/dancers' },
]

const menu = [
  { name: 'Your profile', href: '/profile' },
  // { name: 'Settings', href: '/profile' },
  { name: 'Log out', href: '#' },
]

export default function MainHeader() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated, email, dancer } = useSelector(state => state.auth)
  const {name, lastName} = useSelector(state => state.auth?.dancer)
  const  state = useSelector(state => state)

  console.log("state", state)

  const logout = () => {
    dispatch(loadingRequest(true))
    dispatch(getOrganizedEvent({}))
    dispatch(getAdministratedSchool({}))
    dispatch(dancerLogout())
    dispatch(loadingRequest(false))
    successHandling("Good luck. Come back!")
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 py-5">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex flex-shrink-10 -translate-x-12 mb-2">
                  <img
                    className="hidden h-12 w-auto lg:block cursor-pointer"
                    src="/images/logo/dancing_logo.png"
                    alt="Your Company"
                    onClick={() => navigate("/")}
                  />
                </div>
                <div className="hidden lg:flex lg:gap-x-12 ml-5">
                  {navigation.map((item) => (
                      <NavLink
                          key={item.name}
                          to={item.href}
                          className="text-md font-semibold leading-6 text-gray-300"
                          style={({isActive}) => ({textDecoration: isActive && 'underline', color: isActive && 'white'})}
                      >
                        {item.name}
                      </NavLink>
                  ))}
                </div>
              </div>
              <div className="flex lg:hidden mr-5">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {isAuthenticated ? (
                <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    <button
                        type="button"
                        className="flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true"/>
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <div>
                        <Menu.Button
                            className="flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <div className="flex item-center">
                            <img
                                className="h-8 w-8 rounded-full mt-1"
                                src={dancer.image ? dancer.image : "/images/avatar-default/avatar_default_icon.png"}
                                alt=""
                            />
                            <div className="mx-3">
                              <div className="text-base font-medium text-white">{name} {lastName}</div>
                              <div className="text-sm font-medium text-gray-400">{email}</div>
                            </div>
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {menu.map(item => (
                              <Menu.Item >
                            {({active}) => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={classNamesJoin(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                    onClick={() => item.name==='Log out' && logout()}
                                >
                                  {item.name}
                                </NavLink>
                            )}
                          </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              ) : (
                  <div className="hidden lg:flex flex-1 items-center justify-end gap-x-6">
                    <NavLink
                        to="/login"
                        className="hidden lg:block lg:text-xl lg:font-semibold lg:leading-6 lg:text-white"
                        style={({isActive}) => ({textDecoration: isActive && 'underline', color: isActive && 'orange'})}
                    >
                      Log in
                    </NavLink>
                    <NavLink
                        to="/registration"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white
                        shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600 translate-x-7"
                        style={({isActive}) => ({background: isActive && 'orange'})}
                    >
                      Sign up
                    </NavLink>
                  </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <div className=" lg:flex lg:gap-x-12 ml-5">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className="block text-md font-semibold leading-6 text-gray-300 px-3 py-2"
                        style={({isActive}) => ({textDecoration: isActive && 'underline', color: isActive && 'white'})}
                    >
                      {item.name}
                    </NavLink>
                ))}
              </div>
            </div>
            {isAuthenticated ? (
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={dancer.image ? dancer.image : "/images/avatar-default/avatar_default_icon.png"}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{name} {lastName}</div>
                  <div className="text-sm font-medium text-gray-400">{email}</div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {menu.map(item => (
                          <NavLink
                              to={item.href}
                              className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                              onClick={() => item.name==='Log out' && logout()}
                          >
                            {item.name}
                          </NavLink>
                ))}
              </div>
            </div>
            ) : (
                <div className="flex flex-1 items-center justify-around gap-x-6 mx-5">
                  <NavLink
                      to="/login"
                      className="block text-xl font-semibold leading-6 text-white"
                      style={({isActive}) => ({textDecoration: isActive && 'underline'})}
                  >
                    Log in
                  </NavLink>
                  <NavLink
                      to="/registration"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white
                        shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      style={({isActive}) => ({background: isActive && 'orange'})}
                  >
                    Sign up
                  </NavLink>
                </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}