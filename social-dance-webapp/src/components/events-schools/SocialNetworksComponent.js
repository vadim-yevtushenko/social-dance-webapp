import React from "react";

const SocialNetworksComponent = ({ socialNetworks }) => {

    return (
        <div>
            <h2 className="text-sm font-medium text-gray-900">Social networks</h2>

            <div className="prose prose-sm text-gray-500">
                <ul role="list" className="sm:columns-3">

                    {socialNetworks?.instagram !== "" && (
                        <li>
                            <a
                                target='_blank'
                                href={socialNetworks?.instagram}
                                className="text-indigo-700 hover:text-indigo-500 cursor-pointer"
                            >
                                Instagram
                            </a>
                        </li>
                    )}
                    {socialNetworks?.facebook !== "" && (
                        <li className="pt-1">
                            <a
                                target='_blank'
                                href={socialNetworks?.facebook}
                                className="text-indigo-700 hover:text-indigo-500 cursor-pointer justify-self-center"
                            >
                                Facebook
                            </a>
                        </li>
                    )}
                    {socialNetworks?.youtube !== "" && (
                        <li className="pt-1">
                            <a
                                target='_blank'
                                href={socialNetworks?.youtube}
                                className="text-indigo-700 hover:text-indigo-500 cursor-pointer"
                            >
                                Youtube
                            </a>
                        </li>
                    )}

                </ul>
            </div>
        </div>
    )
}

export default SocialNetworksComponent