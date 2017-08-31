

## introduction
According to this SOP, it is intended to respond early in 10 minutes 
However, most of the subway stations with less than three employees attended
In the event of disaster, one of the persons responsible for the incident is responsible for reporting and responding to the interagency report.
So M2M system required for early detection of emergency response to make desicion at the disaster occuring.

## CORE OF M2M TECHNOLOGY
The core technology of the M2M system can be divided into five broad categories. 

The first is data collection and sensor networks. In this study, the sensor node was constructed with sensor nodes that could receive disaster information.

Second is the wireless communication-based technology. In this study, the sensor network was constructed using the Low Power Wide Area Network, LoRa Technology Network, LPWAN.

The third is monitoring technology. In this study, Master and N Keeper devices shows the results of each N keeper equipment collecting and sharing data in web server.

Fourth is analytic technology. In this study, N will recognize the disaster situation and calculate the escape route.

Until the fourth is the general monitoring and analysis technique, the M2M system does a great deal of activity in the area of control. In this study, we have developed a focus on efficient evacuation routes.

### Wireless Communication
Currently, wireless technology advancements are evolving in wireless communications technologies and data compression. There are many communication protocols, such as Zigbee networks, but there is a lack of communication due to the characteristics of the subway station. In this study, we formed a 900 MHz band of LoRa networks. In the case of Mesh networks, the P2P network was connected to the Keeper network as a result of the failure of data bottlenecks.

### Monitoring
Monitoring shows data collected from sensors and analyzed data. This study produces Web-based applications to show sensor data and analysis results. You can also configure gateway and devices.

## Configuration of M2M system
### REAL-TIME DATA ACQUISITION

### STATUS / RISK ASSESSMENT CALCULATION

### CONFIGURATION OF SYSTEM
System contents of each system are as follows.
A master, while collecting the information monitored in real time, put on the sensor middleware, predict the state recognition with the three states of normal, abnormal and disaster by condition of the sensor data in real time. If the state is that the predicted results show the system is abnormal or disaster, it will response this information to the manager and request to administrator response. The administrator will recognizes the emergency situation and select the three states of normal, abnormal and disaster in accordance with the request of the system within a certain time. When it is determined as normal, the system returns to the normal mode, and records the previous status to the log, and save the situation in ruleset so as not to occur the situation in the same condition. If it is determined abnormal or disaster by managers, the system will perform abnormal and disaster state response process by the SOP.

## DATA ACQUISITION / DEVICE NETWORK
Corresponding M2M network to early warning of disaster is shown in Fig 2. Smart N keeper is consisted of sensor node, N keeper and master server. Sensor node gives and takes data with N -keeper 900MHz band LoRa protocol in LoRa SX1272 network. At this time, Sensor node becomes to have several Nkeepers
with arrival address and network hop in sensor node replaced N-keeper uses MQTT protocol because there are many N-keepers around. Therefore as shown in figure below, duplicated sensor node will be collected in N-keeper’s communication, network’s blind spot that doesn’t reach data in senor node
will be disappeared.

## Sensor DB

The sensor database is stored in the Redis key-value store for each Keeper data store hot data and cold data is stored in the JSON format in mongoDB.

## Virtualization

## Web Application
Disaster early warning M2M web manager is a picture (a) below. A topmost screen shows quantity of battery and sensor node frame count and sensor node number and estimated time of coming data. In the left, total 9 sensor values (temperature, amount of carbon monoxide, oxygen, hydrogen cyanide, nitrogen
dioxide, humidity, atmospheric pressure, battery power, communication state) that reached from the sensor node outputs on the gauge level. At the right, the sensor node location is blinking in the subway station, in order to be well known in this location at a glance. The screen continuously changed while the value of total 18 sensor node comes. It makes us to recognize the present disaster and sensor condition. Figure 3(a) shows main WAS system and Figure 3(b) shows the stored for a long time data saved in the Redis, that is (in memory) database, and indicate 1~2days value for the high-speed process altogether.

## SOP MODULE ALOGHRITHM
In this study, the Minimum Node Weighted Spanning Tree(MNWST)algorithm which it can calculate the minimum distance and path to move to sink(starting point) from each node of graph structure in order to provide optimized refuge path in subway station was developed. MNWST is a kind of a spanning tree, MNWST implements tree exploring each node similar to Breadth First Search(BFS) or Depth First Search(DFS). Basically, MNWST borrows Breadth Fist Search(BFS), and the minimum weight is calculated comparing weight of each node redundantly. This algorithm brings in the graph that all nodes are connected and if the graph is not connected, when this algorithm has the index in [1] and the routine is around in the code once, the process where it checks whether there is the changed matter has to be included. Moreover, when process ends all nodes gets the less value than |V| +1 in connected graph, the
number of the child node of each node can be found in Parent[].The process that creates MNWST is the same as Figure 4.

