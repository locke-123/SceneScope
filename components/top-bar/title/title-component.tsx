import Image from 'next/image'
import logo from '../../../public/scenescope.webp'
import Link from 'next/link'

export default function TitleComponent(){

    return (
        <Link href="/">
            <Image src={logo} width={170} alt="SceneScope Logo"/>
        </Link>
    )
}