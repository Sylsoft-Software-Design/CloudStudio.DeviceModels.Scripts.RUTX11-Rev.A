function parseUplink(device, payload) {
    try {
        var parsed = payload.asJsonObject();
        env.log("Parsed object: " + JSON.stringify(parsed));

        // Asegurarse de que ELABeacons y data están presentes y son válidos
        if (parsed.ELABeacons && typeof parsed.ELABeacons.data === 'string') {
            var dataObj = JSON.parse(parsed.ELABeacons.data); // Parsear la propiedad "data"
            var temperature = parseFloat(dataObj.temperature); // Obtener el valor de "temperature"

            // Extraer y convertir el timestamp a un formato de fecha UTC
            var timestamp = parsed.ELABeacons.timestamp;
            var utcDateTime = new Date(timestamp * 1000); // Convertir de segundos a milisegundos

            // Verifica la MAC y guarda en el endpoint correspondiente con timestamp
            if (parsed.ELABeacons.mac === "F8:60:50:EC:15:FD") {
                // Guarda la temperatura en el endpoint address "1" con timestamp
                var e = device.endpoints.byAddress("1");
                if (e != null) {
                    e.updateTemperatureSensorStatus(temperature, utcDateTime);
                }
            } else if (parsed.ELABeacons.mac === "CA:05:79:2F:68:FD") {
                // Guarda la temperatura en el endpoint address "2" con timestamp
                var e = device.endpoints.byAddress("2");
                if (e != null) {
                    e.updateTemperatureSensorStatus(temperature, utcDateTime);
                }
            }
        } else {
            env.log("Error: 'data' no es una cadena JSON válida o no está presente en ELABeacons.");
        }
    } catch (error) {
        env.log("Error en parseUplink: " + error.message);
    }
}

function buildDownlink(device, endpoint, command, payload) 
{ 
	// This function allows you to convert a command from the platform 
	// into a payload to be sent to the device.
	// Learn more at https://wiki.cloud.studio/page/200

	// The parameters in this function are:
	// - device: object representing the device to which the command will
	//   be sent. 
	// - endpoint: endpoint object representing the endpoint to which the 
	//   command will be sent. May be null if the command is to be sent to 
	//   the device, and not to an individual endpoint within the device.
	// - command: object containing the command that needs to be sent. More
	//   information at https://wiki.cloud.studio/page/1195.

	// This example is written assuming a device that contains a single endpoint, 
	// of type appliance, that can be turned on, off, and toggled. 
	// It is assumed that a single byte must be sent in the payload, 
	// which indicates the type of operation.

/*
	 payload.port = 25; 	 	 // This device receives commands on LoRaWAN port 25 
	 payload.buildResult = downlinkBuildResult.ok; 

	 switch (command.type) { 
	 	 case commandType.onOff: 
	 	 	 switch (command.onOff.type) { 
	 	 	 	 case onOffCommandType.turnOn: 
	 	 	 	 	 payload.setAsBytes([30]); 	 	 // Command ID 30 is "turn on" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.turnOff: 
	 	 	 	 	 payload.setAsBytes([31]); 	 	 // Command ID 31 is "turn off" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.toggle: 
	 	 	 	 	 payload.setAsBytes([32]); 	 	 // Command ID 32 is "toggle" 
	 	 	 	 	 break; 
	 	 	 	 default: 
	 	 	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 	 	 break; 
	 	 	 } 
	 	 	 break; 
	 	 default: 
	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 break; 
	 }
*/

}