import React, { useState, useEffect } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { AreaForm, Table } from "pages/Area/components";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { useSelector } from "react-redux";
import { AreaData, AreaFormData } from "interfaces/pages/Area";
import { RootState } from "interfaces/redux/store";



const Areas = () => {
    const [areas, setAreas] = useState<AreaData[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const token = useSelector<RootState>((state) => state.auth.token);
    const [currentSelected, setCurrentSelected] = useState<AreaData | null>(
        null
    );
    const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCreatingOrEditing, setIsCreatingOrEditing] = useState<boolean>(
        false
    );

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onSelect = (area: AreaData) => {
        setCurrentSelected(area);
        handleDrawerOpen();
    };

    const editArea = async (areaData: AreaFormData) => {
        console.log("add areaaa")
        try {
            setIsCreatingOrEditing(true);
            await axios.put("area/",
                {
                    uuid: currentSelected?.uuid,
                    name: areaData?.name,
                    city: areaData?.city?.id,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            getAreas()
            handleDrawerClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsCreatingOrEditing(false);
        }
    };
    const addArea = async (areaData: AreaFormData) => {
        console.log("add areaaa")
        try {
            setIsCreatingOrEditing(true);
            await axios.post("area/", {
                name: areaData?.name,
                city: areaData?.city?.id,
            },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            getAreas();
            handleDrawerClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsCreatingOrEditing(false);
        }
    };

    const onDelete = async (uuid: string) => {
        try {
            setMessage("Deleting Area");
            setIsMessageVisible(true);
            await axios.delete("area/", {
                data: {
                    uuid,
                },
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setMessage("Successfully Deleted");
            setIsMessageVisible(true);
            setAreas([
                ...areas.filter(({ uuid: area_uuid }) => area_uuid !== uuid),
            ]);
        } catch (error) {
            setMessage("Error Occured While Deleting");
            setIsMessageVisible(true);
        }
    };

    const getAreas = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get("area/", {

                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setAreas(data?.results);
            setCount(data?.count)
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAreas();
    }, []);

    return (
        <>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
                onOpen={handleDrawerOpen}
            >
                <AreaForm
                    initialValues={{
                        name: currentSelected?.name || "",
                        city: currentSelected?.city || "",

                    }}
                    onSubmit={currentSelected ? editArea : addArea}
                    editMode={currentSelected ? true : false}
                    isCreatingOrEditing={isCreatingOrEditing}
                />
            </SwipeableDrawer>
            <Table
                openAreaForm={() => {
                    setCurrentSelected(null);
                    handleDrawerOpen();
                }}
                count={count}
                data={areas}
                onSelect={onSelect}
                onDelete={onDelete}
                isLoading={isLoading}
            />
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMessageVisible}
                onClose={() => setIsMessageVisible(false)}
                message={message}
                autoHideDuration={3000}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        onClick={() => setIsMessageVisible(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            />
        </>
    );
};

export { Areas };
