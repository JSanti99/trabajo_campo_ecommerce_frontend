import { useContext, useEffect, useState } from "react";
import { AlignJustify, Rss, Info, Image, Users, Edit } from "react-feather";
import {
  Card,
  CardImg,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { endpoint } from "../../../utility/Utils";
import defaultBanner from "@src/assets/images/banner/banner.png";
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { AbilityContext } from "@src/utility/context/Can";

const ProfileHeader = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [permiso, setPermiso] = useState(false);
  const ability = useContext(AbilityContext);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (data.ability) {
      data.ability.map((a) => {
        if (ability.can(a.action, a.subject)) {
          setPermiso(true);
        }
      });
    }
  }, []);
  if (!data.tienda) return <div>No tienes tienda</div>;

  return (
    <Card className="profile-header mb-2">
      <CardImg
        src={
          data.tienda
            ? data.tienda.coverImg
              ? `${endpoint}${data.tienda.coverImg.url}`
              : defaultBanner
            : defaultBanner
        }
        alt="User Profile Image"
        style={{ maxHeight: "20rem", objectFit: "contain" }}
        top
      />
      <div className="position-relative">
        <div className="profile-img-container d-flex align-items-center">
          <div className="profile-img">
            <img
              className="rounded img-fluid"
              src={
                data.userImg ? `${endpoint}${data.userImg.url}` : defaultAvatar
              }
              alt="Card image"
            />
          </div>
          <div className="profile-title ml-3">
            <h2 className="text-white">
              {data.tienda?.companyName || data.username}
            </h2>
            <p className="text-white">{data.designation}</p>
          </div>
        </div>
      </div>
      <div className="profile-header-nav">
        <Navbar
          className="justify-content-end justify-content-md-between w-100"
          expand="md"
          light
        >
          <Button color="" className="btn-icon navbar-toggler" onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className="profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0">
              <Nav className="mb-0" pills>
                <NavItem>
                  <NavLink className="font-weight-bold" active>
                    <span className="d-none d-md-block">Feed</span>
                    <Rss className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="font-weight-bold">
                    <span className="d-none d-md-block">About</span>
                    <Info className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="font-weight-bold">
                    <span className="d-none d-md-block">Photos</span>
                    <Image className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="font-weight-bold">
                    <span className="d-none d-md-block">Friends</span>
                    <Users className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
              </Nav>
              {permiso && (
                <Button color="primary">
                  <Edit className="d-block d-md-none" size={14} />
                  <span className="font-weight-bold d-none d-md-block">
                    Edit
                  </span>
                </Button>
              )}
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  );
};

export default ProfileHeader;
