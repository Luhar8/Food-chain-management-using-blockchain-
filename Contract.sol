pragma solidity ^0.6.0;

contract SupplyChain {
    
    event Added(uint256 index);
    
    struct State{
        string description;
        address person;
        string designation_s;
        string companyName_s;
        string Location_s;
        // string price_s;
        string date_s;
    }
    
    struct Product{
        address creator;
        string productName;
        string ProducerName;
        string location_p;
        string price;
        // string quantity;
        uint256 productId;
        string date;
        uint256 totalStates;
        mapping (uint256 => State) positions;
    }
    
    mapping(uint => Product) allProducts;
    uint256 items=0;
    
    function concat(string memory _a, string memory _b) private pure returns (string memory){
        bytes memory bytes_a = bytes(_a);
        bytes memory bytes_b = bytes(_b);
        string memory length_ab = new string(bytes_a.length + bytes_b.length);
        bytes memory bytes_c = bytes(length_ab);
        uint k = 0;
        for (uint i = 0; i < bytes_a.length; i++) bytes_c[k++] = bytes_a[i];
        for (uint i = 0; i < bytes_b.length; i++) bytes_c[k++] = bytes_b[i];
        return string(bytes_c);
    }
    
    function newItem(string memory _p_name, string memory _date,string memory producer_name,string memory price_p,string memory location_prod) public returns (bool) {
        Product memory newItem1 = Product({creator: msg.sender, productName: _p_name, ProducerName:producer_name,location_p:location_prod, date: _date,price:price_p,productId: items,totalStates: 0});
        allProducts[items]=newItem1;
        items = items+1;
        emit Added(items-1);
        return true;
    }
    
    function addState(uint _productId,string memory designation,string memory companyName,string memory Location, string memory info,string memory date) public returns (bool) {
        require(_productId<=items);
        
        State memory newState = State({person: msg.sender, description: info, designation_s:designation, companyName_s:companyName, Location_s:Location, date_s: date});
        
        allProducts[_productId].positions[ allProducts[_productId].totalStates ]=newState;
        
        allProducts[_productId].totalStates = allProducts[_productId].totalStates +1;
        return true;
    }
    
    function searchProduct(uint _productId) public view returns (string memory) {

        
        string memory product_name=allProducts[_productId].productName;
        string memory product_date=allProducts[_productId].date;
        string memory p_name=allProducts[_productId].ProducerName;
        string memory price_prod=allProducts[_productId].price;
        // string memory quantity_prod=allProducts[_productId].quantity;
        string memory Location_producer=allProducts[_productId].location_p;
        
        
        
        string memory output=" ";
        // string memory output_temp;
        
        output=string(abi.encodePacked(product_name,",",p_name,",",Location_producer));
        
        // price_prod,"Produced Quantity:- ",quantity_prod,
        for(uint256 j=0; j<1;j++)
        {
             string memory desc=allProducts[_productId].positions[j].description;
             string memory loc=allProducts[_productId].positions[j].Location_s;
             string memory com=allProducts[_productId].positions[j].companyName_s;
             string memory desig=allProducts[_productId].positions[j].designation_s;
             string memory date=allProducts[_productId].positions[j].date_s;
             output=string(abi.encodePacked(output,"~",desig," : ",com," from ",loc," ",desc," on ",date));
        }
        
        
        
        for (uint256 j=1; j<allProducts[_productId].totalStates; j++){
            
             string memory desc=allProducts[_productId].positions[j].description;
             string memory loc=allProducts[_productId].positions[j].Location_s;
             string memory com=allProducts[_productId].positions[j].companyName_s;
             string memory desig=allProducts[_productId].positions[j].designation_s;
             string memory date=allProducts[_productId].positions[j].date_s;
             output=string(abi.encodePacked(output,"$",desig," : ",com," from ",loc," ",desc," on ",date));
            //  output=string(abi.encodePacked(output,output_temp));
        }
        // return output;
        return output;
    }
    
}