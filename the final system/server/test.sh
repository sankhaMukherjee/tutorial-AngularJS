echo '##############################'
echo '# Testing Machine ID'
echo '##############################'

echo ' machineID_1'
echo '-----------------------------'

for i in `seq 1 10`;
do
        curl "http://localhost:8080/dataMachine?machine=machineID_1"
        echo
done 

echo ' machineID_2'
echo '-----------------------------'
for i in `seq 1 10`;
do
        curl "http://localhost:8080/dataMachine?machine=machineID_2"
        echo
done 

echo ' machineID_12'
echo '-----------------------------'
for i in `seq 1 10`;
do
        curl "http://localhost:8080/dataMachine?machine=machineID_12"
        echo
done 


echo '##############################'
echo '# End testing server'
echo '##############################'
