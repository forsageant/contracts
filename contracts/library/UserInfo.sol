// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

enum RewardType {
    Static,
    Parent,
    Levels,
    Layers
}

struct UserInfo {
    // 最高领取额度限制
    uint256 rewardQuota;
    // 已领取的数量
    uint256 rewardTotal;
    // 未领取的数量
    uint256 rewardPending;
    // 累计投入量
    uint256 totalDeposited;
}

library UserInfoLib {
    /**
     * 对指定的用户追加为领取的奖励数值,收到领取额度限制，若超过则会忽略
     *
     * @param self mapping
     * @param owner 账户地址
     * @param amount 奖励数量
     *
     * @return 实际追加量
     */
    function increasePendingReward(
        mapping(address => UserInfo) storage self,
        address owner,
        RewardType rewardType,
        uint256 amount,
        function(address, RewardType, uint256) internal handler
    ) internal returns (uint256) {
        UserInfo storage info = self[owner];

        uint256 diffQuota = info.rewardQuota -
            info.rewardTotal -
            info.rewardPending;

        uint256 increasedAmount = diffQuota > amount ? amount : diffQuota;
        info.rewardPending += increasedAmount;
        handler(owner, rewardType, increasedAmount);
        return increasedAmount;
    }
}
