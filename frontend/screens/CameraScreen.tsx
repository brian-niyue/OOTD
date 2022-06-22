import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { RootTabScreenProps, RootStackScreenProps } from '../types';
import { useNavigation } from "@react-navigation/native";

export default function CameraScreen({ navigation }: RootTabScreenProps<"Camera">) {

    let nav = useNavigation();
    let camera: Camera;

    const [hasPermission, setHasPermission] = useState<any>(null);  
    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const __takePicture = async () => {
        if (!camera) return;
        const photo = await camera.takePictureAsync();
        setPreviewVisible(true);
        setCapturedImage(photo);
    };

    const __retakePicture = () => {
        setCapturedImage(null);
        setPreviewVisible(false);
    };

    const __uploadPicture = () => {
        nav.navigate("Add", capturedImage.uri);
    };

    const CameraPreview = ({ photo }: any) => {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={{ uri: photo && photo.uri }}
                    style={{ flex: 1, width: "100%", height: "100%" }}
                >
                    <View style={styles.row2}>
                        <TouchableOpacity onPress={__retakePicture} style={styles.retake}>
                            <Text style={styles.text}>cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={__uploadPicture} style={styles.retake}>
                            <Text style={styles.text}>add to wardrobe</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} retakePicture={__retakePicture} />
            ) : (
                <Camera
                    style={{ flex: 1 }}
                    ref={(r) => {
                        camera = r;
                    }}
                >
                    <View style={styles.row}>
                        <TouchableOpacity
                            onPress={__takePicture}
                            style={styles.takepic}
                        />
                    </View>
                </Camera>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 0,
        padding: 20,
        backgroundColor: "transparent",
    },
    takepic: {
        width: 48,
        height: 48,
        bottom: 0,
        borderRadius: 48,
        borderWidth: 2,
        backgroundColor: "#00AFB5",
    },
    row2: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        padding: 20,
        backgroundColor: "transparent",
      },
      retake: {
        padding: 15,
        width: 130,
        alignItems: "center",
        borderRadius: 50,
        borderColor: "#083D77",
        borderWidth: 2,
        backgroundColor: "#00AFB5",
      },
      text: {
        color: "#083D77",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: 18,
      },
});
