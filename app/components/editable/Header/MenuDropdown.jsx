'use client'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Link from 'next/link';

export default function MenuDropdown(props) {

    const galleries = props.galleries

    const formatGalleryName = (gallery) => {
        return gallery
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <DropdownButton variant="none" id="dropdown-basic-button" title="Gallerys">
            {galleries.map((gallery) => (
                <Dropdown.Item key={gallery}>
                    <Link href={`/gallery/${gallery}`}>{formatGalleryName(gallery)}</Link>
                </Dropdown.Item>
            ))}
        </DropdownButton>
    )
}